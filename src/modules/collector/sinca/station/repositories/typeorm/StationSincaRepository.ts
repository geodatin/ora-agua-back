import { getRepository, Repository } from 'typeorm'

import { ICreateStationSincaDTO } from '../../dtos/ICreateStationSincaDTO'
import { StationSinca } from '../../models/StationSinca'
import { IStationSincaRepository } from '../IStationSincaRepository'

class StationSincaRepository implements IStationSincaRepository {
  private repository: Repository<StationSinca>

  constructor() {
    this.repository = getRepository(StationSinca)
  }

  async getStations(): Promise<StationSinca[]> {
    const stations = await this.repository.find()
    return stations
  }

  async createMany(stations: ICreateStationSincaDTO[]): Promise<void> {
    const entities: StationSinca[] = stations.map((station) => {
      const entity = new StationSinca()
      Object.assign(entity, {
        ...station,
        geometry: () =>
          `ST_SetSRID(ST_MakePoint(${station.longitude}, ${station.latitude}), 4326)`,
      })
      return entity
    })
    await this.repository.save(entities)
  }

  async deleteStationsOutOfBasin(): Promise<void> {
    await this.repository.query(`
      delete from station_sinca 
      where code not in
      (
        select station.code as code
        from station_sinca as station, (select ST_UNION(geometry) as geometry from south_america_country) as bacia 
        where ST_Contains(bacia.geometry, station.geometry)
      )
    `)
  }
}

export { StationSincaRepository }
