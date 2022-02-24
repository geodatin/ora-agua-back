import { IFiltersDTO } from '@modules/api/station/dtos/IFiltersDTO'
import { Point } from 'geojson'

import { FrequencyType } from '../types/FrequencyType'

export interface IListObservationRequestDTO {
  page: number
  pageSize: number
  frequency: FrequencyType
  filters: IFiltersDTO
  stationCode?: string
}

export interface IListObservationResponseDTO {
  id: string
  code: number
  name: string
  location: Point
  responsible: string
  lastUpdate: string
  observations?: { key: string; value: number }[]
}
