import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { SatelliteDerivedSedimentsHybam } from '../../models/SatelliteDerivedSedimentsHybam'
import { IObservationHybamRepository } from '../IObservationHybamRepository'

class SatelliteDerivedSedimentsHybamRepository
  implements IObservationHybamRepository
{
  private repository: Repository<SatelliteDerivedSedimentsHybam>

  constructor() {
    this.repository = getRepository(SatelliteDerivedSedimentsHybam)
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
    await insertFromCsvPg(filePath, header, 'satellite_derived_sediments_hybam')
  }

  async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(SatelliteDerivedSedimentsHybam)
      .execute()
  }
}

export { SatelliteDerivedSedimentsHybamRepository }
