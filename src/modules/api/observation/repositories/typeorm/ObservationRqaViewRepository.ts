import { getRepository, Repository } from 'typeorm'

import { ITimeSeriesEntryDTO } from '../../dtos/ITimeSeriesDTO'
import { ObservationRqaView } from '../../models/ObservationRqaView'
import { FrequencyType } from '../../types/FrequencyType'
import { IObservationRqaViewRepository } from '../IObservationRqaViewRepository'

export class ObservationRqaViewRepository
  implements IObservationRqaViewRepository
{
  private repository: Repository<ObservationRqaView>

  constructor() {
    this.repository = getRepository(ObservationRqaView)
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
      .addSelect('"OD"', '"OD"')
      .addSelect('electric_coductivity', 'electricConductivity')
      .addSelect('turbidity', 'turbidity')
      .addSelect('sample_temperature', 'sampleTemperature')
      .addSelect('total_dissolved_solid', 'totalDissolvedSolid')
      .addSelect('total_nitrogen', 'totalNitrogen')
      .addSelect('total_ortophosphate', 'totalOrtophosphate')
      .addSelect('total_suspension_solid', 'totalSuspensionSolid')
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
      ph: 'AVG(ph)',
      OD: 'AVG("OD")',
      electricConductivity: 'AVG(electric_coductivity)',
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
