import { MonthlyDischargeHybam } from '@modules/observation/models/MonthlyDischargeHybam'
import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { IObservationHybamRepository } from '../IObservationHybamRepository'

class MonthlyDischargeHybamRepository implements IObservationHybamRepository {
  private repository: Repository<MonthlyDischargeHybam>

  constructor() {
    this.repository = getRepository(MonthlyDischargeHybam)
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
    await insertFromCsvPg(filePath, header, 'monthly_discharge_hybam')
  }

  async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(MonthlyDischargeHybam)
      .execute()
  }
}

export { MonthlyDischargeHybamRepository }
