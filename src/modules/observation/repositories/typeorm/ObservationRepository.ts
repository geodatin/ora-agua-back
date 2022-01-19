import { ICreateObservationDTO } from '@modules/observation/dtos/ICreateObservationDTO'
import { ITimeSeriesEntryDTO } from '@modules/observation/dtos/ITimeSeriesDTO'
import { ObservationStationView } from '@modules/observation/models/ObservationStationView'
import { getRepository, Repository } from 'typeorm'

import { AppError } from '../../../../errors/AppError'
import { ObservationAna } from '../../models/ObservationAna'
import { IObservationRepository } from '../IObservationRepository'

class ObservationRepository implements IObservationRepository {
  private repository: Repository<ObservationAna>
  constructor() {
    this.repository = getRepository(ObservationAna)
  }
  async refreshLastObservationView(): Promise<void> {
    await this.repository.query(
      'REFRESH MATERIALIZED VIEW observation_station_view WITH DATA'
    )
  }
  async getLastObservation(): Promise<any[]> {
    const result = await getRepository(ObservationStationView)
      .createQueryBuilder('view')
      .select('*')
      .orderBy('timestamp', 'DESC')
      .getRawMany()
    return result
  }
  async getStationMaxDate(stationCode: number): Promise<string> {
    const { date } = await this.repository
      .createQueryBuilder('observation')
      .select('MAX(observation.timestamp)', 'date')
      .where('observation.station_code = :code', { code: stationCode })
      .getRawOne()
    return date
  }
  async create(data: ICreateObservationDTO): Promise<void> {
    const observation = this.repository.create(data)
    await this.repository.save(observation)
  }

  async createMany(data: ICreateObservationDTO[]): Promise<void> {
    await this.repository
      .createQueryBuilder('observation')
      .insert()
      .values(data)
      .execute()
  }

  async getStationObservations(
    stationCode: number,
    dataType: string
  ): Promise<ITimeSeriesEntryDTO[]> {
    const column = this.getColumnByDataType(dataType)
    if (!column) {
      throw new AppError(`Invalid dataType: ${dataType}`)
    }
    const observations = await this.repository
      .createQueryBuilder('observation')
      .select('DATE(timestamp)', 'x')
      .addSelect(column, 'y')
      .where('station_code = :code', { code: stationCode })
      .groupBy('DATE(timestamp)')
      .orderBy('x')
      .getRawMany()

    return observations
  }

  private getColumnByDataType(dataType: string): string {
    const columns = {
      rain: 'SUM(COALESCE(rain, 0))',
      flowRate: 'AVG(COALESCE(flow_rate, 0))',
      adoptedLevel: 'AVG(COALESCE(adopted_level, 0))',
    }
    return columns[dataType]
  }
}

export { ObservationRepository }
