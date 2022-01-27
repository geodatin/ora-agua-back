import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'

import { FrequencyType } from '../types/FrequencyType'

interface ILastObservationDTO {
  page: number
  pageSize: number
  frequency: FrequencyType
  filters: IFiltersDTO
}

export { ILastObservationDTO }
