import { ICreateObservationDTO } from '../dtos/ICreateObservationDTO'

interface IObservationRepository {
  create(data: ICreateObservationDTO): Promise<void>
  createMany(data: ICreateObservationDTO[]): Promise<void>
  getStationMaxDate(stationCode: number): Promise<string>
  refreshLastObservationView(): Promise<void>
}
export { IObservationRepository }
