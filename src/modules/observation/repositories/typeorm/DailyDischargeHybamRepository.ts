import { DailyDischargeHybam } from '@modules/observation/models/DailyDischargeHybam'
import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { IObservationHybamRepository } from '../IObservationHybamRepository'

class DailyDischargeHybamRepository implements IObservationHybamRepository {
  private repository: Repository<DailyDischargeHybam>

  constructor() {
    this.repository = getRepository(DailyDischargeHybam)
  }

  async insertFromCSV(filePath: string, header: string): Promise<void> {
    await insertFromCsvPg(filePath, header, 'daily_discharge_hybam')
  }

  async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(DailyDischargeHybam)
      .execute()
  }
}

export { DailyDischargeHybamRepository }
