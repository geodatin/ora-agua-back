import { ObservationSinca } from '@modules/observation/models/ObservationSinca'
import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getRepository, Repository } from 'typeorm'

import { IObservationSincaRepository } from '../IObservationSincaRepository'

class ObservationSincaRepository implements IObservationSincaRepository {
  private repository: Repository<ObservationSinca>

  constructor() {
    this.repository = getRepository(ObservationSinca)
  }

  async deleteAll(): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(ObservationSinca)
      .execute()
  }

  async insertFromCSV(filePath: string, header: string): Promise<void> {
    await insertFromCsvPg(filePath, header, 'observation_sinca')
  }

  async getCount(): Promise<number> {
    const { count } = await this.repository
      .createQueryBuilder()
      .select('COUNT(*)', 'count')
      .getRawOne()

    return count
  }
}

export { ObservationSincaRepository }
