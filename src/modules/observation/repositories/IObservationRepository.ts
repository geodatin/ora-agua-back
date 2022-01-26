import { ICreateObservationDTO } from '../dtos/ICreateObservationDTO'
import { ITimeSeriesEntryDTO } from '../dtos/ITimeSeriesDTO'

interface IObservationRepository {
  create(data: ICreateObservationDTO): Promise<void>
  createMany(data: ICreateObservationDTO[]): Promise<void>
  getStationMaxDate(stationCode: number): Promise<string>
  getLastObservation(frequency: string): Promise<any[]>
  refreshLastObservationView(): Promise<void>
  getStationObservations(
    stationCode: number,
    dataType: string,
    frequency: string
  ): Promise<ITimeSeriesEntryDTO[]>
}
export { IObservationRepository }
