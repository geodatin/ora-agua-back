import { StationView } from '@modules/station/models/StationView'
import { getRepository, Repository } from 'typeorm'

import { IStationViewRepository } from '../IStationViewRepository'

class StationViewRepository implements IStationViewRepository {
  private repository: Repository<StationView>

  constructor() {
    this.repository = getRepository(StationView)
  }

  async countStationsByCountry(): Promise<
    { count: number; country: string; countryId: number }[]
  > {
    return this.repository
      .createQueryBuilder()
      .select('country')
      .addSelect('country_id', 'countryId')
      .addSelect('count(code)', 'count')
      .groupBy('country, country_id')
      .orderBy('country')
      .getRawMany()
  }

  async countStationsByResponsible(): Promise<
    { count: number; responsible: string }[]
  > {
    return this.repository
      .createQueryBuilder()
      .select('responsible')
      .addSelect('count(code)', 'count')
      .groupBy('responsible')
      .orderBy('responsible')
      .getRawMany()
  }

  async rankingRiversByStations(
    order: string
  ): Promise<{ position: number; river: string; count: number }[]> {
    order = order === 'asc' ? 'ASC' : 'DESC'
    const ranking = await this.repository
      .createQueryBuilder()
      .select('river')
      .addSelect('count(code)', 'count')
      .addSelect(
        `DENSE_RANK() OVER(ORDER BY count ${order} NULLS LAST)::INTEGER`,
        'position'
      )
      .groupBy('river')
      .orderBy('count', order === 'asc' ? 'ASC' : 'DESC')
      .getRawMany()
    return ranking
  }

  async getStations(): Promise<StationView[]> {
    return this.repository.find()
  }
}

export { StationViewRepository }
