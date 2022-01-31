import { LastUpdateView } from '@modules/observation/models/views/LastUpdateView'
import { getRepository, Repository } from 'typeorm'

import { ILastUpdateViewRepository } from '../ILastUpdateViewRepository'

export class LastUpdateViewRepository implements ILastUpdateViewRepository {
  private repository: Repository<LastUpdateView>
  constructor() {
    this.repository = getRepository(LastUpdateView)
  }
  async getLastUpdate(): Promise<Date> {
    const { lastUpdate } = await this.repository.findOne()
    return lastUpdate
  }
}
