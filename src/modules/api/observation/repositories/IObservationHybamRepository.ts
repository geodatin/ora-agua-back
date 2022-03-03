import { IFiltersDTO } from '@modules/api/station/dtos/IFiltersDTO'

import { ITimeSeriesHybamEntryDTO } from '../dtos/ITimeSeriesHybamDTO'
import { FrequencyType } from '../types/FrequencyType'

export interface IObservationHybamRepository {
  timeSeries(
    stationCode: string,
    dataType: string
  ): Promise<ITimeSeriesHybamEntryDTO[]>
  timeSeriesRaw(stationCode: string): Promise<ITimeSeriesHybamEntryDTO[]>
  listObservations(
    filters: IFiltersDTO,
    frequency?: FrequencyType,
    stationCode?: string
  ): Promise<any[]>
}
