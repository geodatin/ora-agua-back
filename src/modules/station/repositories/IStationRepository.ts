import { ICountRequestDTO } from '../dtos/ICountRequestDTO'
import { ICreateStationDTO } from '../dtos/ICreateStationDTO'
import { Station } from '../models/Station'
import { StationAll } from '../models/StationAll'

interface IStationRepository {
  countCountries(): Promise<number>
  create(data: ICreateStationDTO): Promise<void>
  getTelemetricStations(): Promise<StationAll[]>
  getAllStations(networkType?: string): Promise<Station[]>
  getAllStationsFullTable(): Promise<StationAll[]>
  countAllStations(): Promise<number>
  countStationsByType(): Promise<{ count: number; name: string }[]>
  countStationsByCountry({
    order,
  }: ICountRequestDTO): Promise<{ count: number; name: string }[]>
  countStationsBySubwatershed({
    order,
  }: ICountRequestDTO): Promise<{ count: number; name: string }[]>
  countStationsByResponsible({
    order,
  }: ICountRequestDTO): Promise<{ count: number; name: string }[]>
}

export { IStationRepository }
