import { ICreateStationHybamDTO } from '../dtos/ICreateStationHybamDTO'

interface IStationHybamRepository {
  createMany(stations: ICreateStationHybamDTO[]): Promise<void>
  getStationsType(): Promise<Array<{ code: string; type: string }>>
  deleteStationsOutOfBasin(): Promise<void>
}

export { IStationHybamRepository }
