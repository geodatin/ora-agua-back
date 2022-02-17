import { ICreateStationSenhamiDTO } from '../dtos/ICreateStationSenhamiDTO'
import { StationSenhami } from '../models/StationSenhami'

interface IStationSenhamiRepository {
  create(data: ICreateStationSenhamiDTO): Promise<void>
  listStations(): Promise<StationSenhami[]>
}

export { IStationSenhamiRepository }
