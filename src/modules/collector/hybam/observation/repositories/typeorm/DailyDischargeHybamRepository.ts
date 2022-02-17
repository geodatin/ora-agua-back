import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { DailyDischargeHybam } from '../../models/DailyDischargeHybam'
import { IObservationHybamRepository } from '../IObservationHybamRepository'

class DailyDischargeHybamRepository implements IObservationHybamRepository {
  private repository: Repository<DailyDischargeHybam>

  constructor() {
    this.repository = getRepository(DailyDischargeHybam)
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
