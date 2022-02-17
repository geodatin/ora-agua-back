import { IFiltersDTO } from '@modules/api/station/dtos/IFiltersDTO'

import { FrequencyType } from '../types/FrequencyType'

interface ILastObservationDTO {
  page: number
  pageSize: number
  frequency: FrequencyType
  filters: IFiltersDTO
  stationCode?: string
}

export { ILastObservationDTO }
