import { MonthlyWaterLevelHybam } from '@modules/observation/models/MonthlyWaterLevelHybam'
import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { IObservationHybamRepository } from '../IObservationHybamRepository'

class MonthlyWaterLevelHybamRepository implements IObservationHybamRepository {
  private repository: Repository<MonthlyWaterLevelHybam>

  constructor() {
    this.repository = getRepository(MonthlyWaterLevelHybam)
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
