import { IWaterQualityObservationRepository } from '@modules/observation/repositories/IWaterQualityObservationRepository'
import { formatDate } from '@utils/formatDate'
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
import { IDownloadOptionsDTO } from '../../dtos/IDownloadOptionsDTO'

@injectable()
class DownloadObservationCsvsSeeder {
  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository,
    @inject('WaterQualityObservationRepository')
    private waterQualityObservationRepository: IWaterQualityObservationRepository
  ) {}
  async execute(): Promise<void> {
    const stations = await this.stationRepository.getAllStationsFullTable()

    for (const [index, station] of stations.entries()) {
      try {
        await this.downloadDocument(station.code)
        console.log(index)
      } catch (err) {
        console.error(err)
      }
    }
    await this.readFiles(
      path.join(
        path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp'),
        'csvs'
      )
    )
  }

  async downloadDocument(stationCode: number) {
    const baseUrl =
      'https://www.snirh.gov.br/hidroweb/rest/api/documento/convencionais'
    const options: IDownloadOptionsDTO = {
      directory: path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp'),
      filename: `download.zip`,
    }
    const query = {
      documentos: stationCode,
      tipo: 3,
    }
    console.log(baseUrl.concat('?', queryString.stringify(query)))
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

  async unzipDocument(options: IDownloadOptionsDTO): Promise<void> {
    const zip = new AdmZip(path.join(options.directory, options.filename))
    for (const entry of zip.getEntries()) {
      const extension = entry.name.substring(entry.name.length - 3)
      const name = entry.name.substring(0, 8)
      console.log(entry.name)
      if (extension === 'zip' && name === 'qualagua') {
        zip.extractEntryTo(entry.name, path.join(options.directory, 'zipped'))
        await this.unzipDocument({
          directory: path.join(options.directory, 'zipped'),
          filename: entry.name,
        })
        unlinkSync(path.join(options.directory, 'zipped', entry.name))
      } else if (extension === 'csv' && name === 'qualagua') {
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
        zip.extractAllTo(
          path.join(
            path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp'),
            'csvs'
          )
        )
      }
    }
  }

  async downloadFile(url: string, options: IDownloadOptionsDTO): Promise<void> {
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

  async readFiles(directory: string): Promise<void> {
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
        })
    }
  }
}

export { DownloadObservationCsvsSeeder }
