import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'
import { IGetFilterOptionsDTO } from '@modules/station/dtos/IGetFilterOptionsDTO'
import { StationView } from '@modules/station/models/StationView'
import { toSnakeCase } from '@utils/toSnakeCase'
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
      .orderBy('count', 'DESC')
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

    query = this.applyFilters(query, filters)

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

        subQuery = this.applyFilters(subQuery, filters, false)

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

    query = this.applyFilters(query, filters)

    if (network) {
      query.andWhere('network = :network', { network })
    }

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

  // PRIVATE FUNCTIONS

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

    const variableSet = new Set([
      'ph',
      'OD',
      'electricConductivity',
      'turbidity',
      'sampleTemperature',
      'totalDissolvedSolid',
      'totalNitrogen',
      'totalOrtophosphate',
      'totalSuspensionSolid',
      'rain',
      'flowRate',
      'adoptedLevel',
    ])

    if (filters?.variable?.length > 0) {
      filters.variable.forEach((variable) => {
        if (variableSet.has(variable)) {
          if (variable !== 'OD') {
            variable = toSnakeCase(variable)
          }

          if (firstWhere) {
            query = query.where(`"${variable}" = true`)
            firstWhere = false
          } else {
            query = query.andWhere(`"${variable}" = true`)
          }
        }
      })
    }

    return query
  }
}

export { StationViewRepository }
