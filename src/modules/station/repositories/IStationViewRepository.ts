import { IGetFilterOptionsDTO } from '../dtos/IGetFilterOptionsDTO'
import { StationView } from '../models/StationView'

interface IStationViewRepository {
  countAllStations(): Promise<number>
  countStationsByCountry(): Promise<
    { count: number; country: string; countryId: number }[]
  >
  countStationsByResponsible(): Promise<
    { count: number; responsible: string }[]
  >
  countStationsByNetwork(): Promise<{ count: number; network: string }[]>
  rankingRiversByStations(
    order: string
  ): Promise<{ position: number; river: string; count: number }[]>
  getStations(): Promise<StationView[]>
  findFilterOptions(
    column: string,
    filterTerm: string
  ): Promise<IGetFilterOptionsDTO[]>
}

export { IStationViewRepository }
