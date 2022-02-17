import { ICreateObservationSenhamiPeDTO } from '../dtos/ICreateObservationSenhamiPeDTO'

interface IObservationSenhamiPeRepository {
  create(data: ICreateObservationSenhamiPeDTO[]): Promise<void>
  getStationMaxDate(stationCode: string): Promise<string>
}

export { IObservationSenhamiPeRepository }
