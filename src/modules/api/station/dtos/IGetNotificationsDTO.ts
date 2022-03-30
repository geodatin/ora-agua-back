import { IFiltersDTO } from './IFiltersDTO'

export interface IGetNotificationsRequestDTO {
  filters: IFiltersDTO
  limits: {
    rainLimits: { attentionLimit: number; alertLimit: number }
    levelLimits: { attentionLimit: number; alertLimit: number }
    flowRateLimits: { attentionLimit: number; alertLimit: number }
  }
  network?: string
  page?: number
  pageSize?: number
}
