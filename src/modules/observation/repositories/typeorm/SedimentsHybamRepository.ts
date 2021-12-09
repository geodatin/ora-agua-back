import { SedimentsHybam } from '@modules/observation/models/SedimentsHybam'
import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { ISedimentsHybamRepository } from '../ISedimentsHybamRepository'

class SedimentsHybamRepository implements ISedimentsHybamRepository {
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
