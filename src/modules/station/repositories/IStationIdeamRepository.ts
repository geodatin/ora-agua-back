import { ICreateStationIdeamDTO } from '../dtos/ICreateStationIdeamDTO'
import { StationIdeam } from '../models/StationIdeam'

interface IStationIdeamRepository {
  createMany(stations: ICreateStationIdeamDTO[]): Promise<void>
  getStations(): Promise<StationIdeam[]>
  deleteStationsOutOfBasin(): Promise<void>
}

export { IStationIdeamRepository }
