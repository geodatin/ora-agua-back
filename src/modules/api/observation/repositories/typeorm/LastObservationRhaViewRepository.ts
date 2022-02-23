import { IFiltersDTO } from '@modules/api/station/dtos/IFiltersDTO'
import { StationView } from '@modules/api/station/models/StationView'
import { getRepository, Repository } from 'typeorm'

import { applyFilters } from '@shared/database/utils/applyFilters'

import { LastObservationRhaView } from '../../models/LastObservationRhaView'
import { FrequencyType } from '../../types/FrequencyType'
import { ILastObservationViewRepository } from '../ILastObservationViewRepository'

export class LastObservationRhaViewRepository
  implements ILastObservationViewRepository
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
      .select('observation.rain', 'observations_rain')
      .addSelect('observation.level', 'observations_level')
      .addSelect('observation.flow_rate', 'observations_flowRate')
      .addSelect('observation.last_update', 'lastUpdate')
      .addSelect('station.location', 'location')
      .addSelect('station.code', 'code')
      .addSelect('station.responsible', 'responsible')
      .addSelect('station.network', 'network')
      .addSelect('station.name', 'name')
      .innerJoin(
        StationView,
        'station',
        'station.code = observation.station_code'
      )
      .andWhere('observation.frequency = :frequency', { frequency })
      .orderBy('observation.last_update', 'DESC')

    if (stationCode) {
      query.andWhere('station.code = :stationCode', { stationCode })
    }

    applyFilters(query, filters, false)

    query
      .orderBy('last_update')
      .addOrderBy('observation.rain', 'DESC', 'NULLS LAST')

    return await query.getRawMany()
  }
}
