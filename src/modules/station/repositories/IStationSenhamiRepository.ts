import { ICreateStationSenhamiDTO } from '../dtos/ICreateStationSenhamiDTO'

interface IStationSenhamiRepository {
  create(data: ICreateStationSenhamiDTO): Promise<void>
}

export { IStationSenhamiRepository }
