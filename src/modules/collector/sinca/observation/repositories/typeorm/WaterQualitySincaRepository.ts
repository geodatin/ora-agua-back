import { getRepository, Repository } from 'typeorm'

import { insertFromCsvPg } from '../../../../../../shared/database/utils/insertFromCsvPg'
import { WaterQualitySinca } from '../../models/WaterQualitySinca'
import { IWaterQualitySincaRepository } from '../IWaterQualitySincaRepository'

class WaterQualitySincaRepository implements IWaterQualitySincaRepository {
  private repository: Repository<WaterQualitySinca>

  constructor() {
    this.repository = getRepository(WaterQualitySinca)
  }

  async deleteAll(): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(WaterQualitySinca)
      .execute()
  }

  async insertFromCSV(filePath: string, header: string): Promise<void> {
    await insertFromCsvPg(filePath, header, 'water_quality_sinca')
  }

  async getCount(): Promise<number> {
    const { count } = await this.repository
      .createQueryBuilder()
      .select('COUNT(*)', 'count')
      .getRawOne()

    return count
  }
}

export { WaterQualitySincaRepository }
