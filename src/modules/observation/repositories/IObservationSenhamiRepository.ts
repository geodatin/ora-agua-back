import { ICreateObservationSenhamiDTO } from '../dtos/ICreateObservationSenhamiDTO'

interface IObservationSenhamiRepository {
  create(data: ICreateObservationSenhamiDTO): Promise<void>
}

export { IObservationSenhamiRepository }
