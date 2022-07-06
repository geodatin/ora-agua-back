import { formatDate, formatDateCsvs } from '@utils/formatDate'
import { formatNumber } from '@utils/formatNumber'
import AdmZip from 'adm-zip'
import axios from 'axios'
import csvParser from 'csv-parser'
import filesystem, { createWriteStream, unlinkSync } from 'fs'
import moment from 'moment'
import path from 'path'
import queryString from 'query-string'
import { inject, injectable } from 'tsyringe'

import { IStationRepository } from '../../../station/repositories/IStationRepository'
import { ICreateObservationDTO } from '../../dtos/ICreateObservationDTO'
import { IDownloadOptions } from '../../interfaces/IDownloadOptions'
import { IObservationRepository } from '../../repositories/IObservationRepository'
import { IWaterQualityObservationRepository } from '../../repositories/IWaterQualityObservationRepository'

@injectable()
class DownloadObservationCsvsSeeder {
  private tmpFolderPath: string

  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository,
    @inject('WaterQualityObservationRepository')
    private waterQualityObservationRepository: IWaterQualityObservationRepository,
    @inject('ObservationRepository')
    private observationRepository: IObservationRepository
  ) {
    this.tmpFolderPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'tmp'
    )
  }
  async execute(): Promise<void> {
    const stations = await this.stationRepository.getViewStations()
    const { index: lastUpdatedIndex } = await this.getLastUpdatedIndex()
    for (const [index, station] of stations.entries()) {
      if (index >= lastUpdatedIndex) {
        await this.downloadDocument(station.code)
      }
    }
    await this.readFlowFiles(path.join(this.tmpFolderPath, 'csvs', 'vazoes'))
    await this.readLevelFiles(path.join(this.tmpFolderPath, 'csvs', 'cotas'))
    await this.readWaterQualityFiles(
      path.join(this.tmpFolderPath, 'csvs', 'qualagua')
    )
  }

  async downloadDocument(stationCode: string) {
    const baseUrl =
      'https://www.snirh.gov.br/hidroweb/rest/api/documento/convencionais'
    const options: IDownloadOptions = {
      directory: this.tmpFolderPath,
      filename: `download.zip`,
    }
    const query = {
      documentos: stationCode,
      tipo: 3,
    }
    try {
      await this.downloadFile(
        baseUrl.concat('?', queryString.stringify(query)),
        options
      )
      await this.unzipDocument(options)
    } catch (err) {
      console.error(err.message)
    }
  }

  async unzipDocument(options: IDownloadOptions): Promise<void> {
    const zip = new AdmZip(path.join(options.directory, options.filename))
    for (const entry of zip.getEntries()) {
      const extension = entry.name.substring(entry.name.length - 3)
      let shouldExtract = false
      let name = null
      if (entry.name.includes('cotas')) {
        name = 'cotas'
        shouldExtract = true
      }
      if (entry.name.includes('qualagua')) {
        name = 'qualagua'
        shouldExtract = true
      }
      if (entry.name.includes('vazoes')) {
        name = 'vazoes'
        shouldExtract = true
      }

      if (!shouldExtract) continue

      if (extension === 'zip') {
        zip.extractEntryTo(entry.name, path.join(options.directory, 'zipped'))
        await this.unzipDocument({
          directory: path.join(options.directory, 'zipped'),
          filename: entry.name,
        })
        unlinkSync(path.join(options.directory, 'zipped', entry.name))
      } else if (extension === 'csv') {
        console.log(entry.name)
        let shouldPrint = false
        let content = ''
        entry
          .getData()
          .toString()
          .split('\n')
          .forEach((chunck) => {
            if (chunck.split(';')[0] === 'EstacaoCodigo') {
              shouldPrint = true
            }
            if (shouldPrint) {
              content += chunck
            }
          })
        zip.addFile(entry.name, Buffer.from(content, 'utf8'))
        zip.extractAllTo(path.join(this.tmpFolderPath, 'csvs', name))
      }
    }
  }

  async downloadFile(url: string, options: IDownloadOptions): Promise<void> {
    const writer = createWriteStream(
      path.join(options.directory, options.filename)
    )
    return new Promise<void>((resolve, reject) => {
      axios.get(url, { responseType: 'stream' }).then((response) => {
        if (response.headers['content-length'] === '0') {
          reject(new Error('No content'))
        }
        response.data.pipe(writer)
        writer.on('error', reject)
        writer.on('finish', resolve)
      })
    })
  }

  async readWaterQualityFiles(directory: string): Promise<void> {
    const files = await filesystem.promises.readdir(directory)
    for (const file of files) {
      const observationArray = []
      filesystem
        .createReadStream(path.join(directory, file))
        .pipe(csvParser({ separator: ';' }))
        .on('data', (row) => {
          const date = formatDate(row.Data)
          const hour = row.Hora.split(' ')[1] || '00:00:00'
          for (const key in row) {
            if (key !== 'EstacaoCodigo' && key !== 'Data' && key !== 'Hora') {
              row[key] = formatNumber(row[key])
            }
          }

          const observation = {
            stationCode: row.EstacaoCodigo,
            timestamp: moment(date + ' ' + hour).toDate(),
            rain: Number(row.Choveu),
            depth: Number(row.Profundidade),
            tempAmostra: row.TempAmostra,
            ph: row.pH,
            haze: row.Turbidez,
            electricConductivity: row.CondutividadeEletrica,
            totalSuspensionSolid: row.SolSuspensaoTotais,
            totalDissolvedSolid: row.SolDissolvidosTotais,
            totalOrtophosphate: row.OrtofosfatoTotal,
            totalNitrogen: row.NitrogenioTotal,
            OD: row.OD,
          }

          observationArray.push(observation)
        })
        .on('end', async () => {
          await this.waterQualityObservationRepository.createMany(
            observationArray
          )
          unlinkSync(path.join(directory, file))
        })
    }
  }

  async readFlowFiles(directory: string): Promise<void> {
    const files = await filesystem.promises.readdir(directory)
    for (const file of files) {
      const stationCode = file
        .split('_')[2]
        .substring(0, file.split('_')[2].length - 4)
      await this.observationRepository.deleteObservations(Number(stationCode))
      const observationArray = await this.createObservationArray(
        directory,
        file,
        'Vazao'
      )
      const observationArrayChunckSize = 1000
      for (
        let i = 0;
        i < observationArray.length;
        i += observationArrayChunckSize
      ) {
        await this.observationRepository.createMany(
          observationArray.slice(i, i + observationArrayChunckSize)
        )
      }
    }
  }

  async readLevelFiles(directory: string): Promise<void> {
    const files = await filesystem.promises.readdir(directory)
    for (const file of files) {
      const observationArray = await this.createObservationArray(
        directory,
        file,
        'Cota'
      )
      const observationArrayChunckSize = 1000
      for (
        let i = 0;
        i < observationArray.length;
        i += observationArrayChunckSize
      ) {
        try {
          await this.observationRepository.createMany(
            observationArray.slice(i, i + observationArrayChunckSize)
          )
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  async createObservationArray(
    directory: string,
    file: string,
    type: string
  ): Promise<ICreateObservationDTO[]> {
    return new Promise<ICreateObservationDTO[]>((resolve, reject) => {
      const observationArray = []
      filesystem
        .createReadStream(path.join(directory, file))
        .pipe(csvParser({ separator: ';' }))
        .on('data', (row) => {
          const date = formatDateCsvs(row.Data)

          if (row.Hora !== '') return

          if (!date) return

          for (const key in row) {
            if (key !== 'EstacaoCodigo' && key !== 'Data' && key !== 'Hora') {
              row[key] = formatNumber(row[key])
            }

            if (key.includes(type) && !key.includes('Status')) {
              const dayToAdd = Number(key.replace(/\D/g, '')) - 1
              if (type === 'Vazao' && row[key]) {
                const observation = {
                  stationCode: Number(row.EstacaoCodigo),
                  timestamp: moment(date)
                    .add(dayToAdd, 'days')
                    .add(this.generateRandomNumber(1, 60), 'minutes')
                    .add(this.generateRandomNumber(1, 23), 'hours')
                    .add(this.generateRandomNumber(1, 60), 'seconds')
                    .toDate(),
                  rain: null,
                  qRain: null,
                  adoptedLevel: null,
                  qAdoptedLevel: null,
                  flowRate: row[key],
                  qFlowRate: null,
                }
                observationArray.push(observation)
              } else if (type === 'Cota' && row[key]) {
                const observation = {
                  stationCode: Number(row.EstacaoCodigo),
                  timestamp: moment(date)
                    .add(dayToAdd, 'days')
                    .add(this.generateRandomNumber(1, 60), 'minutes')
                    .add(this.generateRandomNumber(1, 23), 'hours')
                    .add(this.generateRandomNumber(1, 60), 'seconds')
                    .toDate(),
                  rain: null,
                  qRain: null,
                  adoptedLevel: row[key],
                  qAdoptedLevel: null,
                  flowRate: null,
                  qFlowRate: null,
                }
                observationArray.push(observation)
              }
            }
          }
        })
        .on('end', () => {
          resolve(observationArray)
          unlinkSync(path.join(directory, file))
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  async updateLastIndex(index: number): Promise<void> {
    filesystem.writeFileSync(
      path.resolve(__dirname, 'files', 'index.json'),
      JSON.stringify({ index: index })
    )
  }

  async getLastUpdatedIndex(): Promise<{ index: number }> {
    const file = filesystem.readFileSync(
      path.resolve(__dirname, 'files', 'index.json')
    )
    const { index } = JSON.parse(file.toString())
    return { index }
  }

  generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }
}

export { DownloadObservationCsvsSeeder }
