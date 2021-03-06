import { getRepository, Repository } from 'typeorm'

import { ICreateObservationSenhamiDTO } from '../../dtos/ICreateObservationSenhamiDTO'
import { ObservationSenhami } from '../../models/ObservationSenhami'
import { IObservationSenhamiRepository } from '../IObservationSenhamiRepository'

class ObservationSenhamiRepository implements IObservationSenhamiRepository {
  private repository: Repository<ObservationSenhami>

  constructor() {
    this.repository = getRepository(ObservationSenhami)
  }

  async create(data: ICreateObservationSenhamiDTO[]): Promise<void> {
    const observation = this.repository.create(data)
    await this.repository.save(observation, { reload: false })
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
