import { ICreateStationHybamDTO } from '@modules/station/dtos/ICreateStationHybamDTO'
import { StationHybam } from '@modules/station/models/StationHybam'
import { getRepository, Repository } from 'typeorm'

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
      Object.assign(entity, station)
      return entity
    })
    await this.repository.save(entities)
  }
}

export { StationHybamRepository }
