import { ICountRequestDTO } from '../dtos/ICountRequestDTO'
import { ICreateStationDTO } from '../dtos/ICreateStationDTO'
import { Station } from '../models/Station'

interface IStationRepository {
  create(data: ICreateStationDTO): Promise<void>
  getTelemetricStations(): Promise<Station[]>
  getAllStations(telemetric?: boolean): Promise<Station[]>
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
