import { LastObservationRhaView } from '@modules/observation/models/views/LastObservationRhaView'
import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'
import { StationView } from '@modules/station/models/StationView'
import { getRepository, Repository } from 'typeorm'

import { ILastObservationRhaViewRepository } from '../ILastObservationRhaViewRepository'

export class LastObservationRhaViewRepository
  implements ILastObservationRhaViewRepository
{
  private repository: Repository<LastObservationRhaView>
  constructor() {
    this.repository = getRepository(LastObservationRhaView)
  }

  async getLastObservations(
    filters: IFiltersDTO,
    network: string
  ): Promise<any> {
    const query = this.repository
      .createQueryBuilder('observation')
      .select('observation.rain', 'rain')
      .addSelect('observation.level', 'level')
      .addSelect('observation.flow_rate', 'flowRate')
      .addSelect('observation.last_update', 'lastUpdate')
      .addSelect('station.location', 'location')
      .addSelect('station.code', 'code')
      .addSelect('station.responsible', 'responsible')
      .addSelect('station.name', 'name')
      .innerJoin(
        StationView,
        'station',
        'station.code = observation.station_code'
      )

    return query
  }
}
