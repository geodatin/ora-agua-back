import { ICreateObservationDTO } from '../dtos/ICreateObservationDTO'
import { ITimeSeriesEntryDTO } from '../dtos/ITimeSeriesDTO'

interface IObservationRepository {
  create(data: ICreateObservationDTO): Promise<void>
  createMany(data: ICreateObservationDTO[]): Promise<void>
  getStationMaxDate(stationCode: number): Promise<string>
  getLastObservation(): Promise<any[]>
  refreshLastObservationView(): Promise<void>
  getStationObservations(
    stationCode: number,
    dataType: string
  ): Promise<ITimeSeriesEntryDTO[]>
}
export { IObservationRepository }
