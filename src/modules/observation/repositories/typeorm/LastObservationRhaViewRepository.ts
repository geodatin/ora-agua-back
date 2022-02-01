import { LastObservationRhaView } from '@modules/observation/models/views/LastObservationRhaView'
import { FrequencyType } from '@modules/observation/types/FrequencyType'
import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'
import { StationView } from '@modules/station/models/views/StationView'
import { getRepository, Repository } from 'typeorm'

import { applyFilters } from '@shared/database/utils/applyFilters'

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
    frequency: FrequencyType,
    stationCode?: string
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
      .andWhere('station.network = :network', { network: 'RHA' })
      .andWhere('observation.frequency = :frequency', { frequency })
      .orderBy('observation.last_update', 'DESC')

    if (stationCode) {
      query.andWhere('station.code = :stationCode', { stationCode })
    }

    applyFilters(query, filters, false)

    query.orderBy('last_update').addOrderBy('rain', 'DESC', 'NULLS LAST')

    return await query.getRawMany()
  }
}
