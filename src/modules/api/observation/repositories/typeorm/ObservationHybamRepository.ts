import { Repository, getRepository, getConnection } from 'typeorm'

import { applyFilters } from '../../../../../shared/database/utils/applyFilters'
import { toSnakeCase } from '../../../../../utils/toSnakeCase'
import { ObservationHybam } from '../../../../collector/hybam/observation/models/ObservationHybam'
import { IFiltersDTO } from '../../../station/dtos/IFiltersDTO'
import { StationView } from '../../../station/models/StationView'
import { ITimeSeriesHybamEntryDTO } from '../../dtos/ITimeSeriesHybamDTO'
import { FrequencyType } from '../../types/FrequencyType'
import { IObservationHybamRepository } from '../IObservationHybamRepository'

export class ObservationHybamRepository implements IObservationHybamRepository {
  private repository: Repository<ObservationHybam>

  constructor() {
    this.repository = getRepository(ObservationHybam)
  }

  async timeSeries(
    stationCode: string,
    dataType: string
  ): Promise<ITimeSeriesHybamEntryDTO[]> {
    const column = this.getColumnByDataType(dataType)
    const timeSeries = await this.repository
      .createQueryBuilder()
      .select('timestamp', 'x')
      .addSelect(column, 'y')
      .where('station_code = :code', { code: stationCode })
      .andWhere(`${column} is not null`)
      .orderBy('x', 'ASC')
      .getRawMany()

    return timeSeries
  }

  async timeSeriesRaw(
    stationCode: string
  ): Promise<ITimeSeriesHybamEntryDTO[]> {
    const timeSeries = await this.repository
      .createQueryBuilder()
      .select('timestamp', 'x')
      .addSelect('ph', 'ph')
      .addSelect('electric_conductivity', 'electricConductivity')
      .addSelect('temperature', 'sampleTemperature')
      .addSelect('total_ortophosphate', 'totalOrtophosphate')
      .addSelect('level', 'level')
      .addSelect('flow_rate', 'flowRate')
      .where('station_code = :code', { code: stationCode })
      .orderBy('x', 'ASC')
      .getRawMany()

    return timeSeries
  }

  async listObservations(
    filters: IFiltersDTO,
    frequency?: FrequencyType,
    stationCode?: string
  ): Promise<any> {
    const query = this.repository
      .createQueryBuilder('observation')
      .select(
        'observation.electric_conductivity',
        'observations_electricConductivity'
      )
      .addSelect('observation.ph', 'observations_ph')
      .addSelect('observation.temperature', 'observations_sampleTemperature')
      .addSelect(
        'observation.total_ortophosphate',
        'observations_totalOrtophosphate'
      )
      .addSelect('observation.level', 'observations_level')
      .addSelect('observation.flow_rate', 'observations_flowRate')
      .addSelect('timestamp', 'lastUpdate')
      .addSelect('station.location', 'location')
      .addSelect('station.code', 'code')
      .addSelect('station.responsible', 'responsible')
      .addSelect('station.network', 'network')
      .addSelect('station.name', 'name')
      .innerJoin(
        StationView,
        'station',
        `station.code = observation.station_code AND station.network = 'HYBAM'`
      )
      .andWhere((qb) => {
        const timestampQuery = qb
          .subQuery()
          .select('MAX(timestamp)', 'timestamp')
          .from(ObservationHybam, 'observation_aux')
          .where('observation_aux.station_code = observation.station_code')
          .getQuery()

        return `timestamp = ${timestampQuery}`
      })

    if (stationCode) {
      query.andWhere('station.code = :stationCode', { stationCode })
    }

    applyFilters(query, filters, false)

    query
      .orderBy('"lastUpdate"', 'DESC')
      .addOrderBy('observation.ph', 'DESC', 'NULLS LAST')

    return await query.getRawMany()
  }

  async getLimits(stationCode: string, dataType: string) {
    const { superiorLimit } = await getConnection()
      .createQueryBuilder()
      .select(`MIN(value)`, 'superiorLimit')
      .from((qb) => {
        return qb
          .select(`${toSnakeCase(dataType)}`, 'value')
          .addSelect(
            `PERCENT_RANK() OVER (ORDER BY ${toSnakeCase(dataType)})`,
            'percentage'
          )
          .where(`${toSnakeCase(dataType)} IS NOT NULL`)
          .andWhere(`${toSnakeCase(dataType)} != 0`)
          .from(ObservationHybam, 'observation')
          .andWhere('station_code = :stationCode', { stationCode })
      }, 't1')
      .where('percentage > 0.9')
      .getRawOne()

    const { inferiorLimit } = await getConnection()
      .createQueryBuilder()
      .select(`MAX(value)`, 'inferiorLimit')
      .from((qb) => {
        return qb
          .select(`${toSnakeCase(dataType)}`, 'value')
          .addSelect(
            `PERCENT_RANK() OVER (ORDER BY ${toSnakeCase(dataType)})`,
            'percentage'
          )
          .from(ObservationHybam, 'observation')
          .where(`${toSnakeCase(dataType)} IS NOT NULL`)
          .andWhere(`${toSnakeCase(dataType)} != 0`)
          .andWhere('station_code = :stationCode', { stationCode })
      }, 't1')
      .where('percentage < 0.1')
      .getRawOne()

    return { superiorLimit, inferiorLimit }
  }

  private getColumnByDataType(dataType: string): string {
    const columns = {
      ph: 'ph',
      electricConductivity: 'electric_conductivity',
      sampleTemperature: 'temperature',
      totalOrtophosphate: 'total_ortophosphate',
      flowRate: 'flow_rate',
      level: 'level',
    }
    return columns[dataType]
  }
}
