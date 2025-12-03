import { ICreateObservationDTO } from '../dtos/ICreateObservationDTO'

interface IObservationRepository {
  create(data: ICreateObservationDTO): Promise<void>
  createMany(data: ICreateObservationDTO[]): Promise<void>
  createManyOrUpdate(data: ICreateObservationDTO[]): Promise<void>
  getStationMaxDate(stationCode: number): Promise<string>
  refreshLastObservationView(): Promise<void>
  deleteObservations(stationCode: number): Promise<void>
  refreshView(viewName: string): Promise<void>
}
export { IObservationRepository }
