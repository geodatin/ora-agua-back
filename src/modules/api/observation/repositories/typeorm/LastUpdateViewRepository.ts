import { getRepository, Repository } from 'typeorm'

import { LastUpdateView } from '../../models/LastUpdateView'
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
