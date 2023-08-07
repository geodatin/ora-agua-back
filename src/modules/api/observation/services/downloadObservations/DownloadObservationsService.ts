import fs from 'fs/promises'
import { json2csv } from 'json-2-csv'
import path from 'path'
import { inject, injectable } from 'tsyringe'

import { IObservationRhaViewRepository } from '../../repositories/IObservationRhaViewRepository'

@injectable()
export class DownloadObservationsService {
  constructor(
    @inject('ObservationRhaViewRepository')
    private ObservationRhaViewRepository: IObservationRhaViewRepository
  ) {}

  async execute(stationCode: string) {
    const observations = await this.ObservationRhaViewRepository.getStationData(
      stationCode
    )
    const csv = await json2csv(observations)
    const filePath = path.join(
      process.cwd(),
      'tmp',
      'downloads',
      `${stationCode}.csv`
    )
    await fs.writeFile(filePath, csv)
    return { filePath, done: true }
  }
}
