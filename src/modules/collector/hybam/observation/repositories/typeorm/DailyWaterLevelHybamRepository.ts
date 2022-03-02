import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { DailyWaterLevelHybam } from '../../models/DailyWaterLevelHybam'
import { IObservationHybamCollectorRepository } from '../IObservationHybamCollectorRepository'

class DailyWaterLevelHybamRepository
  implements IObservationHybamCollectorRepository
{
  private repository: Repository<DailyWaterLevelHybam>

  constructor() {
    this.repository = getRepository(DailyWaterLevelHybam)
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
    await insertFromCsvPg(filePath, header, 'daily_water_level_hybam')
  }

  async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(DailyWaterLevelHybam)
      .execute()
  }
}

export { DailyWaterLevelHybamRepository }
