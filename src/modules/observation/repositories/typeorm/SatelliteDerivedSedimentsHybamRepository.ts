import { SatelliteDerivedSedimentsHybam } from '@modules/observation/models/SatelliteDerivedSedimentsHybam'
import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { ISatelliteDerivedSedimentsHybamRepository } from '../ISatelliteDerivedSedimentsHybamRepository'

class SatelliteDerivedSedimentsHybamRepository
  implements ISatelliteDerivedSedimentsHybamRepository
{
  private repository: Repository<SatelliteDerivedSedimentsHybam>

  constructor() {
    this.repository = getRepository(SatelliteDerivedSedimentsHybam)
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
