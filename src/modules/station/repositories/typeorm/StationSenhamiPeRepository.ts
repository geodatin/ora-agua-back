import { ICreateStationSenhamiPeDTO } from '@modules/station/dtos/ICreateStationSenhamiPeDTO'
import { StationSenhamiPe } from '@modules/station/models/StationSenhamiPe'
import { getRepository, Repository } from 'typeorm'

import { IStationSenhamiPeRepository } from '../IStationSenhamiPeRepository'

class StationSenhamiPeRepository implements IStationSenhamiPeRepository {
  private repository: Repository<StationSenhamiPe>
  constructor() {
    this.repository = getRepository(StationSenhamiPe)
  }

  async create(data: ICreateStationSenhamiPeDTO): Promise<void> {
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

  async listStations(): Promise<StationSenhamiPe[]> {
    const stations = await this.repository.find()
    return stations
  }
}

export { StationSenhamiPeRepository }