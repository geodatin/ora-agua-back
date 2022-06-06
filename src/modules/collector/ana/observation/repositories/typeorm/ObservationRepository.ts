import { Repository, getRepository } from 'typeorm'

import { ICreateObservationDTO } from '../../dtos/ICreateObservationDTO'
import { ObservationAna } from '../../models/ObservationAna'
import { IObservationRepository } from '../IObservationRepository'

class ObservationRepository implements IObservationRepository {
  private repository: Repository<ObservationAna>
  constructor() {
    this.repository = getRepository(ObservationAna)
  }

  async refreshLastObservationView(): Promise<void> {
    await this.repository.query(
      'REFRESH MATERIALIZED VIEW observation_station_view WITH DATA'
    )
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

  async createManyOrUpdate(data: ICreateObservationDTO[]): Promise<void> {
    await this.repository
      .createQueryBuilder('observation')
      .insert()
      .values(data)
      .orUpdate({
        // eslint-disable-next-line camelcase
        conflict_target: ['station_code', 'timestamp'],
        overwrite: ['adopted_level'],
      })
      .execute()
  }

  async deleteObservations(stationCode: number): Promise<void> {
    await this.repository
      .createQueryBuilder('observation')
      .delete()
      .where('station_code = :stationCode', { stationCode })
      .execute()
  }
}

export { ObservationRepository }
