import { getRepository, Repository } from 'typeorm'

import { ICreateObservationSenhamiPeDTO } from '../../dtos/ICreateObservationSenhamiPeDTO'
import { ObservationSenhamiPe } from '../../models/ObservationSenhamiPe'
import { IObservationSenhamiPeRepository } from '../IObservationSenhamiPeRespository'

export class ObservationSenhamiPeRepository
  implements IObservationSenhamiPeRepository
{
  private repository: Repository<ObservationSenhamiPe>

  constructor() {
    this.repository = getRepository(ObservationSenhamiPe)
  }

  async create(data: ICreateObservationSenhamiPeDTO[]): Promise<void> {
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
