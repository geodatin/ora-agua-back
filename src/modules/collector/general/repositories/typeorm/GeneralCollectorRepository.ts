import { getManager } from 'typeorm'

import { IGeneralCollectorRepository } from '../IGeneralCollectorRepository'

export class GeneralCollectorRepository implements IGeneralCollectorRepository {
  async refreshViews(): Promise<void> {
    await getManager().query('REFRESH MATERIALIZED VIEW station_view')

    await getManager().query('REFRESH MATERIALIZED VIEW observation_rha_view')

    await getManager().query(
      'REFRESH MATERIALIZED VIEW observation_rha_list_view'
    )

    await getManager().query('REFRESH MATERIALIZED VIEW last_update_view')

    await getManager().query('REFRESH MATERIALIZED VIEW observation_rqa_view')
  }
}
