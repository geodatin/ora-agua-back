import { IFiltersDTO } from '@modules/api/station/dtos/IFiltersDTO'

import { FrequencyType } from '../types/FrequencyType'

export interface ILastObservationViewRepository {
  getLastObservations(
    filters: IFiltersDTO,
    frequency: FrequencyType,
    stationCode?: string
  ): Promise<any>
}
