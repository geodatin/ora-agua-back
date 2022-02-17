import { getRepository, Repository } from 'typeorm'

import { ICreateStationIdeamDTO } from '../../dtos/ICreateStationIdeamDTO'
import { StationIdeam } from '../../models/StationIdeam'
import { IStationIdeamRepository } from '../IStationIdeamRepository'

class StationIdeamRepository implements IStationIdeamRepository {
  private repository: Repository<StationIdeam>

  constructor() {
    this.repository = getRepository(StationIdeam)
  }

  async createMany(stations: ICreateStationIdeamDTO[]): Promise<void> {
    const entities = stations.map((station) => {
      const entity = new StationIdeam()
      Object.assign(entity, {
        ...station,
        geometry: () =>
          `ST_SetSRID(ST_MakePoint(${station.longitude}, ${station.latitude}), 4326)`,
      })
      return entity
    })
    await this.repository.save(entities)
  }

  async getStations(): Promise<StationIdeam[]> {
    const stations = await this.repository.find()
    return stations
  }

  async deleteStationsOutOfBasin(): Promise<void> {
    await this.repository.query(`
      delete from station_ideam 
      where code not in
      (
        select station.code as code
        from station_ideam as station, (select ST_UNION(geometry) as geometry from south_america_country) as bacia 
        where ST_Contains(bacia.geometry, station.geometry)
      )
    `)
  }
}

export { StationIdeamRepository }
