import { IWaterAreaDTO } from '@modules/water/dtos/IWaterAreaDTO'
import { WaterArea } from '@modules/water/models/WaterArea'
import { getRepository } from 'typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { IWaterAreaRepository } from '../IWaterAreaRepository'

class WaterAreaRepository implements IWaterAreaRepository {
  private repository: Repository<WaterArea>
  constructor() {
    this.repository = getRepository(WaterArea)
  }
  getTotalWaterArea({ country, year }: IWaterAreaDTO): Promise<number> {
    const area = this.repository
      .createQueryBuilder('water_area')
      .select('SUM(water_area)', 'area')
  }
}

export { WaterAreaRepository }
