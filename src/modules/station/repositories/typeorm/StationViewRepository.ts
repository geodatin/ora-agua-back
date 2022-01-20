import { IGetFilterOptionsDTO } from '@modules/station/dtos/IGetFilterOptionsDTO'
import { StationView } from '@modules/station/models/StationView'
import { toSnakeCase } from '@utils/toSnakeCase'
import { getConnection, getRepository, Repository } from 'typeorm'

import { IStationViewRepository } from '../IStationViewRepository'

class StationViewRepository implements IStationViewRepository {
  private repository: Repository<StationView>

  constructor() {
    this.repository = getRepository(StationView)
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