import { IFiltersDTO } from '@modules/api/station/dtos/IFiltersDTO'
import { StationView } from '@modules/api/station/models/StationView'
import { ObservationHybam } from '@modules/collector/hybam/observation/models/ObservationHybam'
import { getRepository, Repository } from 'typeorm'

import { applyFilters } from '@shared/database/utils/applyFilters'

import { ITimeSeriesEntryDTO } from '../../dtos/ITimeSeriesDTO'
import { FrequencyType } from '../../types/FrequencyType'
import { IObservationHybamRepository } from '../IObservationHybamRepository'

export class ObservationHybamRepository implements IObservationHybamRepository {
  private repository: Repository<ObservationHybam>

  constructor() {
    this.repository = getRepository(ObservationHybam)
  }

  async timeSeries(
    stationCode: string,
    frequency: FrequencyType,
    dataType: string
  ): Promise<ITimeSeriesEntryDTO[]> {
    const timeSeries = await this.repository
      .createQueryBuilder()
      .select('date_trunc(:frequency, timestamp)', 'x')
      .addSelect(this.getColumnByDataType(dataType), 'y')
      .where('station_code = :code', { code: stationCode })
      .groupBy('x')
      .orderBy('x', 'DESC')
      .limit(200)
      .setParameter('frequency', frequency)
      .getRawMany()

    return timeSeries.reverse()
  }

  async timeSeriesRaw(
    stationCode: string,
    frequency: FrequencyType
  ): Promise<ITimeSeriesEntryDTO[]> {
    const { maxTimestamp } = await this.repository
      .createQueryBuilder()
      .select('MAX(timestamp)', 'maxTimestamp')
      .where('station_code = :code', { code: stationCode })
      .getRawOne()

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
      .andWhere(
        `timestamp > :maxTimestamp::DATE - INTERVAL '${
          frequency === 'quarter' ? '3 months' : '1 ' + frequency
        }'`,
        {
          maxTimestamp,
        }
      )
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

  private getColumnByDataType(dataType: string): string {
    const columns = {
      ph: 'AVG(ph)',
      OD: 'AVG("OD")',
      electricConductivity: 'AVG(electric_conductivity)',
      turbidity: 'AVG(turbidity)',
      sampleTemperature: 'AVG(sample_temperature)',
      totalDissolvedSolid: 'AVG(total_dissolved_solid)',
      totalNitrogen: 'AVG(total_nitrogen)',
      totalOrtophosphate: 'AVG(total_ortophosphate)',
      totalSuspensionSolid: 'AVG(total_suspension_solid)',
    }
    return columns[dataType]
  }
}
