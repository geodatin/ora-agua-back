import { ICreateStationHybamDTO } from '../dtos/ICreateStationHybamDTO'

interface IStationHybamRepository {
  createMany(stations: ICreateStationHybamDTO[]): Promise<void>
}

export { IStationHybamRepository }
