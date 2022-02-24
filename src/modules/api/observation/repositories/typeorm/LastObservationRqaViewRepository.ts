import { IFiltersDTO } from '@modules/api/station/dtos/IFiltersDTO'
import { StationView } from '@modules/api/station/models/StationView'
import { getRepository, Repository } from 'typeorm'

import { applyFilters } from '@shared/database/utils/applyFilters'

import { LastObservationRqaView } from '../../models/LastObservationRqaView'
import { FrequencyType } from '../../types/FrequencyType'
import { ILastObservationViewRepository } from '../ILastObservationViewRepository'

export class LastObservationRqaViewRepository
  implements ILastObservationViewRepository
{
  private repository: Repository<LastObservationRqaView>
  constructor() {
    this.repository = getRepository(LastObservationRqaView)
  }

  async getLastObservations(
    filters: IFiltersDTO,
    frequency: FrequencyType,
    stationCode?: string
  ): Promise<any> {
    const query = this.repository
      .createQueryBuilder('observation')
      .select('observation."OD"', 'observations_OD')
      .addSelect(
        'observation.electric_conductivity',
        'observations_electricConductivity'
      )
      .addSelect('observation.turbidity', 'observations_turbidity')
      .addSelect('observation.ph', 'observations_ph')
      .addSelect(
        'observation.sample_temperature',
        'observations_sampleTemperature'
      )
      .addSelect(
        'observation.total_dissolved_solid',
        'observations_totalDissolvedSolid'
      )
      .addSelect('observation.total_nitrogen', 'observations_totalNitrogen')
      .addSelect(
        'observation.total_ortophosphate',
        'observations_totalOrtophosphate'
      )
      .addSelect(
        'observation.total_suspension_solid',
        'observations_totalSuspensionSolid'
      )
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
      .addOrderBy('observation.ph', 'DESC', 'NULLS LAST')

    return await query.getRawMany()
  }
}
