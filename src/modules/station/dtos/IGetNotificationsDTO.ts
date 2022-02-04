import { Point } from 'geojson'

import { IFiltersDTO } from './IFiltersDTO'

export interface IGetNotificationsRequestDTO {
  filters: IFiltersDTO
  network?: string
  page?: number
  pageSize?: number
}

export interface INotification {
  code: string
  name: string
  location: Point
  value: number
  type: string
  situation: string
}
