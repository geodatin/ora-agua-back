import { StationView } from '@modules/api/station/models/StationView'
import { getRepository, Repository } from 'typeorm'

import { ICreateStationSenhamiPeDTO } from '../../dtos/ICreateStationSenhamiPeDTO'
import { StationSenhamiPe } from '../../models/StationSenhamiPe'
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
    const stations = await this.repository
      .createQueryBuilder('station')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('code')
          .from(StationView, 'view')
          .getQuery()

        return 'station.code IN ' + subQuery
      })
      .getMany()
    return stations
  }
}

export { StationSenhamiPeRepository }
