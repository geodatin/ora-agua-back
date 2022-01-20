import { IFiltersDTO } from '../dtos/IFiltersDTO'
import { StationView } from '../models/StationView'

interface IStationViewRepository {
  countAllStations(filters: IFiltersDTO): Promise<number>
  countStationsByCountry(
    filters: IFiltersDTO
  ): Promise<{ count: number; country: string; countryId: number }[]>
  countStationsByResponsible(
    filters: IFiltersDTO
  ): Promise<{ count: number; responsible: string }[]>

  countStationsByNetwork(
    filters: IFiltersDTO
  ): Promise<{ count: number; network: string }[]>

  rankingRiversByStations(
    filters: IFiltersDTO,
    order: string
  ): Promise<{ position: number; river: string; count: number }[]>

  getStations(filters: IFiltersDTO): Promise<StationView[]>
}

export { IStationViewRepository }
