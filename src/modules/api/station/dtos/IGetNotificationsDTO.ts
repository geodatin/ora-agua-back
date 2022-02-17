import { IFiltersDTO } from './IFiltersDTO'

export interface IGetNotificationsRequestDTO {
  filters: IFiltersDTO
  limits: {
    rainLimits: number[]
    levelLimits: number[]
    flowRateLimits: number[]
  }
  network?: string
  page?: number
  pageSize?: number
}
