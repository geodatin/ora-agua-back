import { Repository, getRepository, getConnection, getManager } from 'typeorm'

import { applyFilters } from '../../../../../shared/database/utils/applyFilters'
import { toSnakeCase } from '../../../../../utils/toSnakeCase'
import { ObservationRhaListView } from '../../../observation/models/ObservationRhaListView'
import { IFiltersDTO } from '../../dtos/IFiltersDTO'
import { IGetFilterOptionsDTO } from '../../dtos/IGetFilterOptionsDTO'
import {
  IGetStationsRequestDTO,
  IGetStationsResponseDTO,
} from '../../dtos/IGetStationsDTO'
import { IVariablesCountDTO } from '../../dtos/IVariablesCountDTO'
import { StationLimitView } from '../../models/StationLimitView'
import { StationView } from '../../models/StationView'
import { IStationViewRepository } from '../IStationViewRepository'

export class StationViewRepository implements IStationViewRepository {
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
    isNotification,
  }: IGetStationsRequestDTO): Promise<IGetStationsResponseDTO[]> {
    let query = this.repository
      .createQueryBuilder('station')
      .select('code', 'code')
      .addSelect('river', 'river')
      .addSelect('name', 'name')
      .addSelect('type', 'type')
      .addSelect('responsible', 'responsible')
      .addSelect('country', 'country')
      .addSelect('city', 'city')
      .addSelect('state', 'state')
      .addSelect('country_id', 'countryId')
      .addSelect('network', 'network')
      .addSelect('station.location', 'location')

    const firstWhere = true
    query = applyFilters(query, filters, firstWhere)

    query
      .leftJoin(
        (qb) => {
          qb.select('rain', 'rain')
            .addSelect('flow_rate', 'flow_rate')
            .addSelect('level', 'level')
            .addSelect('MAX(last_update)', 'last_update')
            .addSelect('station_code', 'station_code')
            .addSelect('frequency', 'frequency')
            .groupBy('station_code')
            .addGroupBy('rain')
            .addGroupBy('flow_rate')
            .addGroupBy('level')
            .addGroupBy('station_code')
            .addGroupBy('frequency')
            .where(`observation.frequency = 'last'`)
            .from(ObservationRhaListView, 'observation')

          return qb
        },
        'observation',
        `station.code = observation.station_code AND station.network = 'RHA'`
      )
      .addSelect('observation.rain', 'rain')
      .addSelect('observation.flow_rate', 'flowRate')
      .addSelect('observation.level', 'level')
      .addSelect('observation.last_update', 'lastUpdate')
      .leftJoin(
        StationLimitView,
        'limit',
        'limit.station_code = observation.station_code'
      )
      .addSelect(
        `json_build_object(
        'inferiorLimit', limit.level_inferior_limit, 
        'superiorLimit', limit.level_superior_limit
        )`,
        'levelLimits'
      )
      .addSelect(
        `json_build_object(
        'inferiorLimit', limit.flow_rate_inferior_limit, 
        'superiorLimit', limit.flow_rate_superior_limit
        )`,
        'flowRateLimits'
      )

    // if (isNotification) {
    //   query
    //     .andWhere('observation.rain IS NOT NULL')
    //     .andWhere('observation.flow_rate IS NOT NULL')
    //     .andWhere('observation.level IS NOT NULL')
    // }

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

  async getProjectedRhaStations(): Promise<any> {
    const stationsRha = await getManager().query(
      `select true as "isProjected", nome as name, ST_AsGeoJSON(geom)::json as location, territorio as country, origem as responsible, 'RHA' as network from pontos_de_interesse where tem_est = 0`
    )

    return stationsRha
  }

  async getProjectedRqaStations(): Promise<any> {
    const stationsRqa = await getManager().query(
      `select true as "isProjected", nombresiti as name, ST_AsGeoJSON(geom)::json as location, pais as country, null as responsible, 'RQA' as network from rrmca_general where tipositio = 'Referencia' or tipositio = 'Referencia_extra'`
    )
    return stationsRqa
  }

  async getAllStations(): Promise<any> {
    const stations = await getManager().query(
      `select name as name, code::varchar as code, ST_AsGeoJSON(location)::jsonb as location from station_ana
      where st_intersects(location, (select st_union(geometry) from south_america_country))
      union
      select name as name, code::varchar as code, ST_AsGeoJSON(location)::jsonb as location from station_senhami
      where st_intersects(location, (select st_union(geometry) from south_america_country))
      union
      select name as name, code::varchar as code, ST_AsGeoJSON(location)::jsonb as location from station_senhami_pe
      where st_intersects(location, (select st_union(geometry) from south_america_country))
      union
      select name as name, code::varchar as code, ST_AsGeoJSON(geometry)::jsonb as location from station_sinca
      where st_intersects(geometry, (select st_union(geometry) from south_america_country))
      union
      select name as name, code::varchar as code, ST_AsGeoJSON(location)::jsonb as location from station_hybam
      where st_intersects(location, (select st_union(geometry) from south_america_country))`
    )
    return stations
  }
}
