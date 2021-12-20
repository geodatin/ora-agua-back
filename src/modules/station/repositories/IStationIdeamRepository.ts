import { ICreateStationIdeamDTO } from '../dtos/ICreateStationIdeamDTO'

interface IStationIdeamRepository {
  createMany(stations: ICreateStationIdeamDTO[]): Promise<void>
  getStationsCode(): Promise<{ code: string }[]>
}

export { IStationIdeamRepository }
