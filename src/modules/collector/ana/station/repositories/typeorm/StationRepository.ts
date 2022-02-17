import { getRepository, IsNull, Not, Repository } from 'typeorm'

import { ICreateStationDTO } from '../../dtos/ICreateStationDTO'
import { StationAna } from '../../models/StationAna'
import { IStationRepository } from '../IStationRepository'

class StationRepository implements IStationRepository {
  private repository: Repository<StationAna>
  constructor() {
    this.repository = getRepository(StationAna)
  }

  async getTelemetricStations(): Promise<StationAna[]> {
    const stations = await this.repository.find({ id: Not(IsNull()) })
    return stations
  }

  async create(data: ICreateStationDTO): Promise<void> {
    const location = () =>
      `ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326)`
    const station = {
      ...data,
      location: location,
    }
    delete station.latitude
    delete station.longitude
    await this.repository
      .createQueryBuilder('station')
      .insert()
      .values(station)
      .execute()
  }

  async getAllStationsFullTable(): Promise<StationAna[]> {
    const stations = await this.repository.find()
    return stations
  }
}

export { StationRepository }
