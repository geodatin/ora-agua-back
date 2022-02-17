import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { SedimentsHybam } from '../../models/SedimentsHybam'
import { IObservationHybamRepository } from '../IObservationHybamRepository'

class SedimentsHybamRepository implements IObservationHybamRepository {
  private repository: Repository<SedimentsHybam>

  constructor() {
    this.repository = getRepository(SedimentsHybam)
  }

  async getLastObservation(): Promise<{ code: string; date: Date }[]> {
    const lastObservations = await this.repository
      .createQueryBuilder()
      .select('station_code', 'code')
      .addSelect('MAX(timestamp)', 'date')
      .groupBy('station_code')
      .getRawMany()
    return lastObservations
  }

  async insertFromCSV(filePath: string, header: string): Promise<void> {
    await insertFromCsvPg(filePath, header, 'sediments_hybam')
  }

  async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(SedimentsHybam)
      .execute()
  }
}

export { SedimentsHybamRepository }
