import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'

export interface ILastObservationRhaViewRepository {
  getLastObservations(filters: IFiltersDTO, network: string): Promise<any>
}
