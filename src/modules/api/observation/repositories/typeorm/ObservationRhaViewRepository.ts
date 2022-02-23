import { getRepository, Repository } from 'typeorm'

import { ITimeSeriesEntryDTO } from '../../dtos/ITimeSeriesDTO'
import { ObservationRhaView } from '../../models/ObservationRhaView'
import { FrequencyType } from '../../types/FrequencyType'
import { IObservationRhaViewRepository } from '../IObservationRhaViewRepository'

class ObservationRhaViewRepository implements IObservationRhaViewRepository {
  private repository: Repository<ObservationRhaView>

  constructor() {
    this.repository = getRepository(ObservationRhaView)
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
