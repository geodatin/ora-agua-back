import { ICreateStationSincaDTO } from '@modules/station/dtos/ICreateStationSincaDTO'
import { StationSinca } from '@modules/station/models/StationSinca'
import { getRepository, Repository } from 'typeorm'

import { IStationSincaRepository } from '../IStationSincaRepository'

class StationSincaRepository implements IStationSincaRepository {
  private repository: Repository<StationSinca>

  constructor() {
    this.repository = getRepository(StationSinca)
  }

  async createMany(stations: ICreateStationSincaDTO[]): Promise<void> {
    const entities: StationSinca[] = stations.map((station) => {
      const entity = new StationSinca()
      Object.assign(entity, station)
      return entity
    })
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(StationSinca)
      .values(entities)
      .execute()
  }
}

export { StationSincaRepository }
