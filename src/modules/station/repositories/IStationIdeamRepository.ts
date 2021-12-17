import { ICreateStationIdeamDTO } from '../dtos/ICreateStationIdeamDTO'

interface IStationIdeamRepository {
  createMany(stations: ICreateStationIdeamDTO[]): Promise<void>
}

export { IStationIdeamRepository }
