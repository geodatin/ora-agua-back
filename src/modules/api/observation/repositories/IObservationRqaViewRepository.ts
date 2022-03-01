import { IFiltersDTO } from '@modules/api/station/dtos/IFiltersDTO'

import { ITimeSeriesEntryDTO } from '../dtos/ITimeSeriesDTO'
import { FrequencyType } from '../types/FrequencyType'

interface IObservationRqaViewRepository {
  timeSeries(
    stationCode: string,
    frequency: FrequencyType,
    dataType: string
  ): Promise<ITimeSeriesEntryDTO[]>
  timeSeriesRaw(
    stationCode: string,
    frequency: FrequencyType
  ): Promise<ITimeSeriesEntryDTO[]>
  getLastObservations(
    filters: IFiltersDTO,
    frequency?: FrequencyType,
    stationCode?: string
  ): Promise<any[]>
}

export { IObservationRqaViewRepository }
