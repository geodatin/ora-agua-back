import { ICreateStationSenhamiDTO } from '@modules/station/dtos/ICreateStationSenhamiDTO'
import { StationSenhami } from '@modules/station/models/StationSenhami'
import { getRepository, Repository } from 'typeorm'

import { IStationSenhamiRepository } from '../IStationSenhamiRepository'

class StationSenhamiRepository implements IStationSenhamiRepository {
  private repository: Repository<StationSenhami>
  constructor() {
    this.repository = getRepository(StationSenhami)
  }

  async create(data: ICreateStationSenhamiDTO): Promise<void> {
    const location = () =>
      `ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326)`
    const station = {
      ...data,
      location: location,
    }
    delete station.latitude
    delete station.longitude
    await this.repository
      .createQueryBuilder('station_senhami')
      .insert()
      .values(station)
      .execute()
  }

  async listStations(): Promise<StationSenhami[]> {
    const stations = await this.repository.find()
    return stations
  }
}

export { StationSenhamiRepository }
