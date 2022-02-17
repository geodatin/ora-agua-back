import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getRepository, Repository } from 'typeorm'

import { ICreateWaterQualityIdeamDTO } from '../../dtos/ICreateWaterQualityIdeamDTO'
import { WaterQualityIdeam } from '../../models/WaterQualityIdeam'
import { IWaterQualityIdeamRepository } from '../IWaterQualityIdeamRepository'

class WaterQualityIdeamRepository implements IWaterQualityIdeamRepository {
  private repository: Repository<WaterQualityIdeam>

  constructor() {
    this.repository = getRepository(WaterQualityIdeam)
  }

  async createMany(data: ICreateWaterQualityIdeamDTO[]): Promise<void> {
    const entities: WaterQualityIdeam[] = []

    for (const value of data) {
      const alreadyExists = await this.repository.findOne({
        where: {
          stationCode: value.stationCode,
          timestamp: value.timestamp,
        },
      })
      if (!alreadyExists) {
        const entity = new WaterQualityIdeam()
        Object.assign(entity, value)
        entities.push(entity)
      }
    }
    await this.repository.save(entities)
  }

  async insertFromCSV(filePath: string, header: string): Promise<void> {
    await insertFromCsvPg(filePath, header, 'water_quality_ideam')
  }
}

export { WaterQualityIdeamRepository }
