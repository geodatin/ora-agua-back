import Zipper from 'adm-zip'
import download from 'async-get-file'
import fs from 'fs'
import path from 'path'
import queryString from 'query-string'
import { inject, injectable } from 'tsyringe'

import { IStationRepository } from '../../../station/repositories/IStationRepository'
import { IDownloadOptionsDTO } from '../../dtos/IDownloadOptionsDTO'

@injectable()
class DownloadObservationCsvs {
  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository
  ) {}
  async execute(): Promise<void> {
    const stations = await this.stationRepository.getAllStations()

    for (const station of stations) {
      await this.downloadDocument(station.id)
    }
  }

  async downloadDocument(stationCode: number) {
    const baseUrl =
      'https://www.snirh.gov.br/hidroweb/rest/api/documento/convencionais'
    const options: IDownloadOptionsDTO = {
      directory: path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        'assets'
      ),
      filename: 'download.zip',
    }
    const query = {
      documentos: stationCode,
      type: 3,
    }
    await download(baseUrl.concat(queryString.stringify(query)), options)
  }

  async unzipDocument(options: IDownloadOptionsDTO): Promise<void> {
    const zip = new Zipper(path.join(options.directory, options.filename))
    zip.extractAllTo(path.join(options.directory, 'tmp'))
    const directory = await fs.promises.opendir(
      path.join(options.directory, 'tmp')
    )
    for await (const file of directory) {
      const zip = new Zipper(path.join(options.directory, 'tmp', file.name))
      zip.extractAllTo(path.join(options.directory, 'csvs'))
    }
  }
}

export { DownloadObservationCsvs }
