import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'
import { IGetFilterOptionsDTO } from '@modules/station/dtos/IGetFilterOptionsDTO'
import { StationView } from '@modules/station/models/views/StationView'
import { toSnakeCase } from '@utils/toSnakeCase'
import { getConnection, getRepository, Repository } from 'typeorm'

import { applyFilters } from '@shared/database/utils/applyFilters'

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

    query = applyFilters(query, filters)

    const stationsCount = await query
      .groupBy('network')
      .orderBy('count', 'DESC')
      .getRawMany()

    return stationsCount
  }

  async countAllStations(filters: IFiltersDTO): Promise<number> {
    let query = this.repository
      .createQueryBuilder()
      .select('count(code)', 'count')

    query = applyFilters(query, filters)

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

    query = applyFilters(query, filters)

    const stationsCount = await query
      .groupBy('country, country_id')
      .orderBy('count', 'DESC')
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

    query = applyFilters(query, filters)

    const stationsCount = await query
      .groupBy('responsible')
      .orderBy('count', 'DESC')
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
          .where('stations.river IS NOT NULL')

        subQuery = applyFilters(subQuery, filters, false)

        return subQuery
          .groupBy('stations.river')
          .orderBy('count', order === 'asc' ? 'ASC' : 'DESC', 'NULLS LAST')
      }, 'counting')
      .getRawMany()
    return ranking
  }

  async getStations(
    filters: IFiltersDTO,
    network: string = null
  ): Promise<StationView[]> {
    let query = this.repository.createQueryBuilder().select()

    let firstWhere = true
    if (network) {
      query.where('network = :network', { network })
      firstWhere = false
    }

    query = applyFilters(query, filters, firstWhere)

    return query.getMany()
  }

  async findFilterOptions(
    column: string,
    filterTerm: string
  ): Promise<IGetFilterOptionsDTO[]> {
    const columnName = toSnakeCase(column)
    const options = await this.repository
      .createQueryBuilder('station')
      .select(`DISTINCT station.${columnName} AS value`)
      .addSelect(`'${column}' AS type`)
      .where(`station.${columnName} ILIKE :filterTerm`, {
        filterTerm: `${filterTerm}%`,
      })
      .getRawMany()

    return options
  }
}

export { StationViewRepository }
