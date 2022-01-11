import { StationView } from '../models/StationView'

interface IStationViewRepository {
  countStationsByCountry(): Promise<
    { count: number; country: string; countryId: number }[]
  >
  countStationsByResponsible(): Promise<
    { count: number; responsible: string }[]
  >
  rankingRiversByStations(
    order: string
  ): Promise<{ position: number; river: string; count: number }[]>
  getStations(): Promise<StationView[]>
}

export { IStationViewRepository }
