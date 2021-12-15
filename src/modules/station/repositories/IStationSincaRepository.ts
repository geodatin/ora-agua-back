import { ICreateStationSincaDTO } from '../dtos/ICreateStationSincaDTO'

interface IStationSincaRepository {
  createMany(stations: ICreateStationSincaDTO[]): Promise<void>
}

export { IStationSincaRepository }
