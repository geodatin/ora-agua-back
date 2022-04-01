import { IFiltersDTO } from './IFiltersDTO'

export interface IGetNotificationsRequestDTO {
  filters: IFiltersDTO
  limits: {
    rainLimits: { superiorLimit: number; inferiorLimit: number }
    levelLimits: { superiorLimit: number; inferiorLimit: number }
    flowRateLimits: { superiorLimit: number; inferiorLimit: number }
  }
  network?: string
  page?: number
  pageSize?: number
}
