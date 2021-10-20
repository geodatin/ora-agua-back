import { ObservationStationView } from '@modules/observation/models/ObservationStationView'
import { getRepository, Repository } from 'typeorm'

import { ICreateObservationDTO } from '../../dtos/ICreateObservationDTO'
import { Observation } from '../../models/Observation'
import { IObservationRepository } from '../IObservationRepository'

class ObservationRepository implements IObservationRepository {
  private repository: Repository<Observation>
  constructor() {
    this.repository = getRepository(Observation)
  }
  async getLastObservation(): Promise<any[]> {
    const result = await getRepository(ObservationStationView)
      .createQueryBuilder('view')
      .select('*')
      .orderBy('timestamp', 'DESC')
      .getRawMany()
    return result
  }
  async getStationMaxDate(stationCode: number): Promise<string> {
    const { date } = await this.repository
      .createQueryBuilder('observation')
      .select('MAX(observation.timestamp)', 'date')
      .where('observation.station_code = :code', { code: stationCode })
      .getRawOne()
    return date
  }
  async create(data: ICreateObservationDTO): Promise<void> {
    const observation = this.repository.create(data)
    await this.repository.save(observation)
  }

  async createMany(data: ICreateObservationDTO[]): Promise<void> {
    await this.repository
      .createQueryBuilder('observation')
      .insert()
      .values(data)
      .execute()
  }
}

export { ObservationRepository }
