import { ICreateStationDTO } from '../dtos/ICreateStationDTO'
import { StationAna } from '../models/StationAna'

interface IStationRepository {
  create(data: ICreateStationDTO): Promise<void>
  getTelemetricStations(): Promise<StationAna[]>
  getAllStationsFullTable(): Promise<StationAna[]>
}

export { IStationRepository }
