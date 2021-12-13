import { DailyWaterLevelHybam } from '@modules/observation/models/DailyWaterLevelHybam'
import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { IObservationHybamRepository } from '../IObservationHybamRepository'

class DailyWaterLevelHybamRepository implements IObservationHybamRepository {
  private repository: Repository<DailyWaterLevelHybam>

  constructor() {
    this.repository = getRepository(DailyWaterLevelHybam)
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
