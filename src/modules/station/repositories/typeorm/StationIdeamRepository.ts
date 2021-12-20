import { ICreateStationIdeamDTO } from '@modules/station/dtos/ICreateStationIdeamDTO'
import { StationIdeam } from '@modules/station/models/StationIdeam'
import { getRepository, Repository } from 'typeorm'

import { IStationIdeamRepository } from '../IStationIdeamRepository'

class StationIdeamRepository implements IStationIdeamRepository {
  private repository: Repository<StationIdeam>

  constructor() {
    this.repository = getRepository(StationIdeam)
  }

  async createMany(stations: ICreateStationIdeamDTO[]): Promise<void> {
    const entities = stations.map((station) => {
      const geometry = () =>
        `ST_SetSRID(ST_MakePoint(${station.longitude}, ${station.latitude}), 4326)`

      return {
        ...station,
        geometry: geometry,
      }
    })
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(StationIdeam)
      .values(entities)
      .execute()
  }

  async getStationsCode(): Promise<{ code: string }[]> {
    const stationsCode = await this.repository.find({ select: ['code'] })
    return stationsCode
  }
}

export { StationIdeamRepository }
