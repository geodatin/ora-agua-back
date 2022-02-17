import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { MonthlyWaterLevelHybam } from '../../models/MonthlyWaterLevelHybam'
import { IObservationHybamRepository } from '../IObservationHybamRepository'

class MonthlyWaterLevelHybamRepository implements IObservationHybamRepository {
  private repository: Repository<MonthlyWaterLevelHybam>

  constructor() {
    this.repository = getRepository(MonthlyWaterLevelHybam)
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

  async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(MonthlyWaterLevelHybam)
      .execute()
  }

  async insertFromCSV(filePath: string, header: string): Promise<void> {
    await insertFromCsvPg(filePath, header, 'monthly_water_level_hybam')
  }
}

export { MonthlyWaterLevelHybamRepository }
