import { StationView } from '@modules/station/models/StationView'
import { getConnection, getRepository, Repository } from 'typeorm'

import { IStationViewRepository } from '../IStationViewRepository'

class StationViewRepository implements IStationViewRepository {
  private repository: Repository<StationView>

  constructor() {
    this.repository = getRepository(StationView)
  }

  countStationsByNetwork(): Promise<{ count: number; network: string }[]> {
    return this.repository
      .createQueryBuilder()
      .select('network')
      .addSelect('count(code)', 'count')
      .groupBy('network')
      .orderBy('network')
      .getRawMany()
  }

  async countAllStations(): Promise<number> {
    const { count } = await this.repository
      .createQueryBuilder()
      .select('count(code)', 'count')
      .getRawOne()

    return count
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
    const connection = getConnection()
    const ranking = await connection
      .createQueryBuilder()
      .select('counting.river', 'river')
      .addSelect('count')
      .addSelect(
        `DENSE_RANK() OVER(ORDER BY count ${
          order === 'asc' ? 'ASC' : 'DESC'
        } NULLS LAST)::INTEGER`,
        'position'
      )
      .from((subQuery) => {
        return subQuery
          .select('stations.river', 'river')
          .addSelect('count(code)', 'count')
          .from(StationView, 'stations')
          .groupBy('stations.river')
          .orderBy('count', order === 'asc' ? 'ASC' : 'DESC', 'NULLS LAST')
      }, 'counting')
      .getRawMany()
    return ranking
  }

  async getStations(): Promise<StationView[]> {
    return this.repository.find()
  }
}

export { StationViewRepository }
