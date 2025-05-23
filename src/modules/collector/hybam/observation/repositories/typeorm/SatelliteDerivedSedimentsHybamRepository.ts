import { getConnection, getRepository, Repository } from 'typeorm'

import { insertFromCsvPg } from '../../../../../../shared/database/utils/insertFromCsvPg'
import { SatelliteDerivedSedimentsHybam } from '../../models/SatelliteDerivedSedimentsHybam'
import { IObservationHybamCollectorRepository } from '../IObservationHybamCollectorRepository'

class SatelliteDerivedSedimentsHybamRepository
  implements IObservationHybamCollectorRepository
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
