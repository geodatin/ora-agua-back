import { Point } from 'geojson'

import { IFiltersDTO } from './IFiltersDTO'

export interface IGetStationsResponseDTO {
  code: string
  name: string
  river: string
  type: string
  responsible: string
  country: string
  countryId: string
  network: string
  location: Point
  rain: number
  level: number
  flowRate: number
  situation: string
  hasData: boolean
  lastUpdate: string
}

export interface IGetStationsRequestDTO {
  filters: IFiltersDTO
  network?: string
}
