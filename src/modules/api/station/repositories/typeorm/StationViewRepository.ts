import { ObservationRhaListView } from '@modules/api/observation/models/ObservationRhaListView'
import { toSnakeCase } from '@utils/toSnakeCase'
import { getConnection, getRepository, Repository } from 'typeorm'

import { applyFilters } from '@shared/database/utils/applyFilters'

import { IFiltersDTO } from '../../dtos/IFiltersDTO'
import { IGetFilterOptionsDTO } from '../../dtos/IGetFilterOptionsDTO'
import {
  IGetStationsRequestDTO,
  IGetStationsResponseDTO,
} from '../../dtos/IGetStationsDTO'
import { IVariablesCountDTO } from '../../dtos/IVariablesCountDTO'
import { StationView } from '../../models/StationView'
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
      .createQueryBuilder('station')
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
      .createQueryBuilder('station')
      .select('count(code)', 'count')

    query = applyFilters(query, filters)

    const { count } = await query.getRawOne()

    return count
  }

  async countStationsByCountry(
    filters: IFiltersDTO
  ): Promise<{ count: number; country: string; countryId: number }[]> {
    let query = this.repository
      .createQueryBuilder('station')
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
      .createQueryBuilder('station')
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
  ): Promise<{ river: string; count: number; network: string }[]> {
    const connection = getConnection()
    const ranking = await connection
      .createQueryBuilder()
      .select('counting.river', 'river')
      .addSelect('count')
      .addSelect('counting.network', 'network')
      .from((subQuery) => {
        subQuery = subQuery
          .select('station.river', 'river')
          .addSelect('count(code)', 'count')
          .addSelect('station.network', 'network')
          .from(StationView, 'station')
          .where('station.river IS NOT NULL')

        subQuery = applyFilters(subQuery, filters, false)

        return subQuery.groupBy('station.river').addGroupBy('station.network')
      }, 'counting')
      .getRawMany()
    return ranking
  }

  async getStations({
    filters,
    network,
  }: IGetStationsRequestDTO): Promise<IGetStationsResponseDTO[]> {
    let query = this.repository
      .createQueryBuilder('station')
      .select('code', 'code')
      .addSelect('river', 'river')
      .addSelect('name', 'name')
      .addSelect('type', 'type')
      .addSelect('responsible', 'responsible')
      .addSelect('country', 'country')
      .addSelect('country_id', 'countryId')
      .addSelect('network', 'network')
      .addSelect('station.location', 'location')

    const firstWhere = true
    query = applyFilters(query, filters, firstWhere)

    query
      .leftJoin(
        ObservationRhaListView,
        'observation',
        `station.code = observation.station_code AND observation.frequency = 'week'`
      )
      .addSelect('observation.rain', 'rain')
      .addSelect('observation.flow_rate', 'flowRate')
      .addSelect('observation.level', 'level')
      .addSelect('observation.last_update', 'lastUpdate')

    return query.getRawMany()
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

  async countStationsByVariable(
    filters: IFiltersDTO
  ): Promise<IVariablesCountDTO[]> {
    let query = this.repository
      .createQueryBuilder('station')
      .select('network', 'network')
      .addSelect('count(*) filter (where ph)', 'ph')
      .addSelect('count(*) filter (where "OD")', 'OD')
      .addSelect(
        'count(*) filter (where electric_conductivity)',
        'electricConductivity'
      )
      .addSelect('count(*) filter (where turbidity)', 'turbidity')
      .addSelect(
        'count(*) filter (where sample_temperature)',
        'sampleTemperature'
      )
      .addSelect(
        'count(*) filter (where total_dissolved_solid)',
        'totalDissolvedSolid'
      )
      .addSelect('count(*) filter (where total_nitrogen)', 'totalNitrogen')
      .addSelect(
        'count(*) filter (where total_ortophosphate)',
        'totalOrtophosphate'
      )
      .addSelect(
        'count(*) filter (where total_suspension_solid)',
        'totalSuspensionSolid'
      )
      .addSelect('count(*) filter (where rain)', 'rain')
      .addSelect('count(*) filter (where flow_rate)', 'flowRate')
      .addSelect('count(*) filter (where adopted_level)', 'level')

    query = applyFilters(query, filters)

    const stationsCountByVariableAndNetwork = await query
      .groupBy('network')
      .getRawMany()

    return stationsCountByVariableAndNetwork
  }
}

export { StationViewRepository }
