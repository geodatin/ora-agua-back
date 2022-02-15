import { ITimeSeriesEntryDTO } from '@modules/observation/dtos/ITimeSeriesDTO'
import { ObservationRhaView } from '@modules/observation/models/views/ObservationRhaView'
import { FrequencyType } from '@modules/observation/types/FrequencyType'
import { getRepository, Repository } from 'typeorm'

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
      .addSelect('level', 'adoptedLevel')
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
      .orderBy('x', 'DESC')
      .limit(100)
      .getRawMany()

    return timeSeries.reverse()
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
