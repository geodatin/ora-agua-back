import { ICreateObservationSenhamiDTO } from '../dtos/ICreateObservationSenhamiDTO'

interface IObservationSenhamiRepository {
  create(data: ICreateObservationSenhamiDTO[]): Promise<void>
  getStationMaxDate(stationCode: string): Promise<string>
}

export { IObservationSenhamiRepository }
