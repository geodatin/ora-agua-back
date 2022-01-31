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
    const changeOrderFrequency = ['hour', 'day', 'week']
    // Changes orderBy option to get most recent records
    const shouldChangeOrder = changeOrderFrequency.includes(frequency)
    const timeSeries = await this.repository
      .createQueryBuilder()
      .select(`date_trunc(:frequency, timestamp)`, 'x')
      .addSelect(this.getColumnByDataType(dataType), 'y')
      .where('station_code = :code', { code: stationCode })
      .groupBy('x')
      .orderBy('x', shouldChangeOrder ? 'DESC' : 'ASC')
      .limit(200)
      .setParameter('frequency', frequency)
      .getRawMany()

    if (shouldChangeOrder) {
      // Reverse array to return it on the ascending order
      return timeSeries.reverse()
    }

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
