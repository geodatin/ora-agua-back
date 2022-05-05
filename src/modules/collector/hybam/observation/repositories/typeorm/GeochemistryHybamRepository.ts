import { getConnection, getRepository, Repository } from 'typeorm'

import { insertFromCsvPg } from '@shared/database/utils/insertFromCsvPg'

import { GeochemistryHybam } from '../../models/GeochemistryHybam'
import { IObservationHybamCollectorRepository } from '../IObservationHybamCollectorRepository'

class GeochemistryHybamRepository
  implements IObservationHybamCollectorRepository
{
  private repository: Repository<GeochemistryHybam>

  constructor() {
    this.repository = getRepository(GeochemistryHybam)
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
    await insertFromCsvPg(filePath, header, 'geochemistry_hybam')
  }

  async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(GeochemistryHybam)
      .execute()
  }
}

export { GeochemistryHybamRepository }
