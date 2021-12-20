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

  async getLastObservation(): Promise<{ code: string; date: Date }[]> {
    const observations = await this.repository
      .createQueryBuilder()
      .select('station_code', 'code')
      .addSelect('MAX(timestamp)', 'date')
      .groupBy('code')
      .getRawMany()
    return observations
  }
}

export { ObservationIdeamRepository }
