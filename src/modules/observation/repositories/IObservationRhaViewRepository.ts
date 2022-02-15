import { ITimeSeriesEntryDTO } from '../dtos/ITimeSeriesDTO'
import { FrequencyType } from '../types/FrequencyType'

interface IObservationRhaViewRepository {
  timeSeries(
    stationCode: string,
    frequency: FrequencyType,
    dataType: string
  ): Promise<ITimeSeriesEntryDTO[]>
  timeSeriesRaw(
    stationCode: string,
    frequency: FrequencyType
  ): Promise<ITimeSeriesEntryDTO[]>
}

export { IObservationRhaViewRepository }
