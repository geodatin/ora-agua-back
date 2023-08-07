import { toSnakeCase } from '@utils/toSnakeCase'
import { getConnection, getRepository, Repository } from 'typeorm'

import { ITimeSeriesEntryDTO } from '../../dtos/ITimeSeriesDTO'
import { ObservationRhaView } from '../../models/ObservationRhaView'
import { FrequencyType } from '../../types/FrequencyType'
import { IObservationRhaViewRepository } from '../IObservationRhaViewRepository'

class ObservationRhaViewRepository implements IObservationRhaViewRepository {
  private repository: Repository<ObservationRhaView>

  constructor() {
    this.repository = getRepository(ObservationRhaView)
  }

  async getStationData(stationCode: string): Promise<any[]> {
    const timeSeries = await this.repository
      .createQueryBuilder()
      .where('station_code = :code', { code: stationCode })
      .orderBy('timestamp', 'DESC')
      .getMany()

    return timeSeries
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
      .andWhere(`${toSnakeCase(dataType)} != 0`)
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
      .addSelect('rain', 'rain')
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
          .from(ObservationRhaView, 'observation')
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
          .from(ObservationRhaView, 'observation')
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
      rain: 'SUM(COALESCE(rain, 0))',
      flowRate: 'AVG(COALESCE(flow_rate, 0))',
      level: 'AVG(COALESCE(level, 0))',
    }
    return columns[dataType]
  }
}

export { ObservationRhaViewRepository }
