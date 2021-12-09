import { GeochemistryHybam } from '@modules/observation/models/GeochemistryHybam'
import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { IObservationHybamRepository } from '../IObservationHybamRepository'

class GeochemistryHybamRepository implements IObservationHybamRepository {
  private repository: Repository<GeochemistryHybam>

  constructor() {
    this.repository = getRepository(GeochemistryHybam)
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
