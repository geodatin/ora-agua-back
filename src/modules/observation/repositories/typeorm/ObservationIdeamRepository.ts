import { ObservationIdeam } from '@modules/observation/models/ObservationIdeam'
import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getRepository, Repository } from 'typeorm'

import { IObservationIdeamRepository } from '../IObservationIdeamRepository'

class ObservationIdeamRepository implements IObservationIdeamRepository {
  private repository: Repository<ObservationIdeam>

  constructor() {
    this.repository = getRepository(ObservationIdeam)
  }

  async insertFromCSV(filePath: string, header: string): Promise<void> {
    await insertFromCsvPg(filePath, header, 'observation_ideam')
  }

  async getLastObservation(): Promise<Array<{ code: string; date: Date }>> {
    const dates = await this.repository
      .createQueryBuilder()
      .select('MAX(timestamp)', 'date')
      .addSelect('station_code', 'code')
      .groupBy('station_code')
      .getRawMany()
    return dates
  }
}

export { ObservationIdeamRepository }
