import { ICountRequestDTO } from '@modules/station/dtos/ICountRequestDTO'
import { getRepository, IsNull, Not, Repository } from 'typeorm'

import { ICreateStationDTO } from '../../dtos/ICreateStationDTO'
import { Station } from '../../models/Station'
import { IStationRepository } from '../IStationRepository'

class StationRepository implements IStationRepository {
  private repository: Repository<Station>
  constructor() {
    this.repository = getRepository(Station)
  }
  async countStationsByResponsible({
    order,
  }: ICountRequestDTO): Promise<{ count: number; name: string }[]> {
    const stationsCount = await this.repository
      .createQueryBuilder('station')
      .select('responsible', 'name')
      .addSelect('COUNT(1)', 'count')
      .where('responsible IS NOT NULL')
      .groupBy('responsible')
      .orderBy('count', order === 'asc' ? 'ASC' : 'DESC')
      .getRawMany()
    return stationsCount
  }
  async countStationsBySubwatershed({
    order,
  }: ICountRequestDTO): Promise<{ count: number; name: string }[]> {
    const stationsCount = await this.repository
      .createQueryBuilder('station')
      .select('subwatershed', 'name')
      .addSelect('COUNT(1)', 'count')
      .where('subwatershed IS NOT NULL')
      .groupBy('subwatershed')
      .orderBy('count', order === 'asc' ? 'ASC' : 'DESC')
      .getRawMany()
    return stationsCount
  }
  async countStationsByCountry({
    order,
  }: ICountRequestDTO): Promise<{ count: number; name: string }[]> {
    const stationsCount = await this.repository
      .createQueryBuilder('station')
      .select('country', 'name')
      .addSelect('COUNT(1)', 'count')
      .where('country IS NOT NULL')
      .groupBy('country')
      .orderBy('count', 'ASC')
      .orderBy('count', order === 'asc' ? 'ASC' : 'DESC')
      .getRawMany()
    return stationsCount
  }
  async countStationsByType(): Promise<{ count: number; name: string }[]> {
    const stations = await this.repository
      .createQueryBuilder('station')
      .select('type', 'name')
      .addSelect('COUNT(1)', 'count')
      .groupBy('type')
      .orderBy('type')
      .getRawMany()
    return stations
  }
  async countAllStations(): Promise<number> {
    return this.repository.count()
  }

  async getAllStations(): Promise<Station[]> {
    const stations = await this.repository.find({
      select: [
        'country',
        'location',
        'type',
        'name',
        'subwatershed',
        'river',
        'city',
        'responsible',
        'operator',
      ],
      where: {
        country: Not(IsNull()),
      },
    })
    return stations
  }

  async getTelemetricStations(): Promise<Station[]> {
    const stations = await this.repository.find({ telemetric: true })
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
}

export { StationRepository }
