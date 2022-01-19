import { ICreateStationSenhamiPeDTO } from '../dtos/ICreateStationSenhamiPeDTO'
import { StationSenhamiPe } from '../models/StationSenhamiPe'

interface IStationSenhamiPeRepository {
  create(data: ICreateStationSenhamiPeDTO): Promise<void>
  listStations(): Promise<StationSenhamiPe[]>
}

export { IStationSenhamiPeRepository }
