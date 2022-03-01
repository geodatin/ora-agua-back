import { IFiltersDTO } from '@modules/api/station/dtos/IFiltersDTO'

import { FrequencyType } from '../types/FrequencyType'

export interface IObservationRhaListViewRepository {
  listObservations(
    filters: IFiltersDTO,
    frequency: FrequencyType,
    stationCode?: string
  ): Promise<any[]>
}
