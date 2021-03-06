import { getRepository, Repository } from 'typeorm'

import { WaterQualityObservation } from '../../models/WaterQualityObservation'
import { IWaterQualityObservationRepository } from '../IWaterQualityObservationRepository'

class WaterQualityObservationRepository
  implements IWaterQualityObservationRepository
{
  private repository: Repository<WaterQualityObservation>
  constructor() {
    this.repository = getRepository(WaterQualityObservation)
  }
  async createMany(data: any): Promise<void> {
    await this.repository
      .createQueryBuilder('waterQuality')
      .insert()
      .values(data)
      .execute()
  }
}

export { WaterQualityObservationRepository }
