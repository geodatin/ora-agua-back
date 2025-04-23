import { getConnection, getRepository, Repository } from 'typeorm'

import { insertFromCsvPg } from '../../../../../../shared/database/utils/insertFromCsvPg'
import { SedimentsHybam } from '../../models/SedimentsHybam'
import { IObservationHybamCollectorRepository } from '../IObservationHybamCollectorRepository'

class SedimentsHybamRepository implements IObservationHybamCollectorRepository {
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
