import { ICreateObservationSenhamiDTO } from '@modules/observation/dtos/ICreateObservationSenhamiDTO'
import { ObservationSenhami } from '@modules/observation/models/ObservationSenhami'
import { getRepository, Repository } from 'typeorm'

import { IObservationSenhamiRepository } from '../IObservationSenhamiRepository'

class ObservationSenhamiRepository implements IObservationSenhamiRepository {
  private repository: Repository<ObservationSenhami>

  constructor() {
    this.repository = getRepository(ObservationSenhami)
  }

  async create(data: ICreateObservationSenhamiDTO[]): Promise<void> {
    const observation = this.repository.create(data)
    await this.repository.save(observation)
  }

  async getStationMaxDate(stationCode: string): Promise<string> {
    const { date } = await this.repository
      .createQueryBuilder('observation')
      .select('MAX(timestamp)', 'date')
      .where('station_code = :stationCode', { stationCode })
      .getRawOne()
    return date
  }
}

export { ObservationSenhamiRepository }
