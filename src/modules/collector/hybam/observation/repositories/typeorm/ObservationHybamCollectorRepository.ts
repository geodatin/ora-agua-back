import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { ObservationHybam } from '../../models/ObservationHybam'
import { IObservationHybamCollectorRepository } from '../IObservationHybamCollectorRepository'

class ObservationHybamCollectorRepository
  implements IObservationHybamCollectorRepository
{
  private repository: Repository<ObservationHybam>

  constructor() {
    this.repository = getRepository(ObservationHybam)
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
    await insertFromCsvPg(filePath, header, 'observation_hybam')
  }

  async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ObservationHybam)
      .execute()
  }
}

export { ObservationHybamCollectorRepository }
