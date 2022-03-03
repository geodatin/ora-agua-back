import { IFiltersDTO } from '@modules/api/station/dtos/IFiltersDTO'

import { ITimeSeriesRqaEntryDTO } from '../dtos/ITimeSeriesRqaDTO'
import { FrequencyType } from '../types/FrequencyType'

interface IObservationRqaViewRepository {
  timeSeries(
    stationCode: string,
    frequency: FrequencyType,
    dataType: string
  ): Promise<ITimeSeriesRqaEntryDTO[]>
  timeSeriesRaw(
    stationCode: string,
    frequency: FrequencyType
  ): Promise<ITimeSeriesRqaEntryDTO[]>
  listObservations(
    filters: IFiltersDTO,
    frequency?: FrequencyType,
    stationCode?: string
  ): Promise<any[]>
}

export { IObservationRqaViewRepository }
