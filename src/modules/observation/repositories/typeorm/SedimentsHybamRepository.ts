import { SedimentsHybam } from '@modules/observation/models/SedimentsHybam'
import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { IObservationHybamRepository } from '../IObservationHybamRepository'

class SedimentsHybamRepository implements IObservationHybamRepository {
  private repository: Repository<SedimentsHybam>

  constructor() {
    this.repository = getRepository(SedimentsHybam)
  }

  async insertFromCSV(filePath: string, header: string): Promise<void> {
    await insertFromCsvPg(filePath, header, 'sediments_hybam')
  }

  async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(SedimentsHybam)
      .execute()
  }
}

export { SedimentsHybamRepository }
