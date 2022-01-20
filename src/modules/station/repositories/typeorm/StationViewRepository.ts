import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'
import { StationView } from '@modules/station/models/StationView'
import {
  getConnection,
  getRepository,
  Repository,
  SelectQueryBuilder,
} from 'typeorm'

import { IStationViewRepository } from '../IStationViewRepository'

class StationViewRepository implements IStationViewRepository {
  private repository: Repository<StationView>

  constructor() {
    this.repository = getRepository(StationView)
  }

  async countStationsByNetwork(
    filters: IFiltersDTO
  ): Promise<{ count: number; network: string }[]> {
    let query = this.repository
      .createQueryBuilder()
      .select('network')
      .addSelect('count(code)', 'count')

    query = this.applyFilters(query, filters)

    const stationsCount = await query
      .groupBy('network')
      .orderBy('network')
      .getRawMany()

    return stationsCount
  }

  async countAllStations(filters: IFiltersDTO): Promise<number> {
    let query = this.repository
      .createQueryBuilder()
      .select('count(code)', 'count')

    query = this.applyFilters(query, filters)

    const { count } = await query.getRawOne()

    return count
  }

  async countStationsByCountry(
    filters: IFiltersDTO
  ): Promise<{ count: number; country: string; countryId: number }[]> {
    let query = this.repository
      .createQueryBuilder()
      .select('country')
      .addSelect('country_id', 'countryId')
      .addSelect('count(code)', 'count')

    query = this.applyFilters(query, filters)

    const stationsCount = await query
      .groupBy('country, country_id')
      .orderBy('country')
      .getRawMany()

    return stationsCount
  }

  async countStationsByResponsible(
    filters: IFiltersDTO
  ): Promise<{ count: number; responsible: string }[]> {
    let query = this.repository
      .createQueryBuilder()
      .select('responsible')
      .addSelect('count(code)', 'count')

    query = this.applyFilters(query, filters)

    const stationsCount = await query
      .groupBy('responsible')
      .orderBy('responsible')
      .getRawMany()

    return stationsCount
  }

  async rankingRiversByStations(
    filters: IFiltersDTO,
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
        subQuery = subQuery
          .select('stations.river', 'river')
          .addSelect('count(code)', 'count')
          .from(StationView, 'stations')

        subQuery = this.applyFilters(subQuery, filters)

        return subQuery
          .groupBy('stations.river')
          .orderBy('count', order === 'asc' ? 'ASC' : 'DESC', 'NULLS LAST')
      }, 'counting')
      .getRawMany()
    return ranking
  }

  async getStations(filters: IFiltersDTO): Promise<StationView[]> {
    let query = this.repository.createQueryBuilder().select()

    query = this.applyFilters(query, filters)

    return query.getMany()
  }

  private applyFilters(
    query: SelectQueryBuilder<any>,
    filters: IFiltersDTO,
    firstWhere: boolean = true
  ): SelectQueryBuilder<any> {
    if (filters?.country?.length > 0) {
      if (firstWhere) {
        query = query.where('country IN (:...countries)', {
          countries: filters.country,
        })
        firstWhere = false
      } else {
        query = query.andWhere('country IN (:...countries)', {
          countries: filters.country,
        })
      }
    }

    if (filters?.name?.length > 0) {
      if (firstWhere) {
        query = query.where('name IN (:...names)', {
          names: filters.name,
        })
        firstWhere = false
      } else {
        query = query.andWhere('name IN (:...names)', {
          names: filters.name,
        })
      }
    }

    if (filters?.network?.length > 0) {
      if (firstWhere) {
        query = query.where('network IN (:...networks)', {
          networks: filters.network,
        })
        firstWhere = false
      } else {
        query = query.andWhere('network IN (:...networks)', {
          networks: filters.network,
        })
      }
    }

    if (filters?.responsible?.length > 0) {
      if (firstWhere) {
        query = query.where('responsible IN (:...responsibles)', {
          responsibles: filters.responsible,
        })
        firstWhere = false
      } else {
        query = query.andWhere('responsible IN (:...responsibles)', {
          responsibles: filters.responsible,
        })
      }
    }

    if (filters?.river?.length > 0) {
      if (firstWhere) {
        query = query.where('river IN (:...rivers)', {
          rivers: filters.river,
        })
        firstWhere = false
      } else {
        query = query.andWhere('river IN (:...rivers)', {
          rivers: filters.river,
        })
      }
    }

    return query
  }
}

export { StationViewRepository }
