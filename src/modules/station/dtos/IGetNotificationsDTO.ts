import { IFiltersDTO } from './IFiltersDTO'

export interface IGetNotificationsRequestDTO {
  filters: IFiltersDTO
  network?: string
  page?: number
  pageSize?: number
}
