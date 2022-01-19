import { ICreateStationSincaDTO } from '../dtos/ICreateStationSincaDTO'
import { StationSinca } from '../models/StationSinca'

interface IStationSincaRepository {
  createMany(stations: ICreateStationSincaDTO[]): Promise<void>
  deleteStationsOutOfBasin(): Promise<void>
  getStations(): Promise<StationSinca[]>
}

export { IStationSincaRepository }
