import { getRepository, Repository } from 'typeorm'

import { ICreateStationHybamDTO } from '../../dtos/ICreateStationHybamDTO'
import { StationHybam } from '../../models/StationHybam'
import { IStationHybamRepository } from '../IStationHybamRepository'

class StationHybamRepository implements IStationHybamRepository {
  private repository: Repository<StationHybam>

  constructor() {
    this.repository = getRepository(StationHybam)
  }

  async getStationsType(): Promise<{ code: string; type: string }[]> {
    const stations = await this.repository.find({ select: ['code', 'type'] })
    return stations
  }

  async createMany(stations: ICreateStationHybamDTO[]): Promise<void> {
    const entities: StationHybam[] = stations.map((station) => {
      const entity = new StationHybam()
      Object.assign(entity, {
        ...station,
        location: () =>
          `ST_SetSRID(ST_MakePoint(${station.longitude}, ${station.latitude}), 4326)`,
      })
      return entity
    })
    await this.repository.save(entities)
  }

  async deleteStationsOutOfBasin(): Promise<void> {
    await this.repository.query(`
      delete from station_hybam 
      where code not in
      (
        select station.code as code
        from station_hybam as station, (select ST_UNION(geometry) as geometry from south_america_country) as bacia 
        where ST_Contains(bacia.geometry, station.location)
      )
    `)
  }
}

export { StationHybamRepository }
