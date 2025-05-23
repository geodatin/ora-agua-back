import { getConnection, getRepository, Repository } from 'typeorm'

import { insertFromCsvPg } from '../../../../../../shared/database/utils/insertFromCsvPg'
import { PhysicalChemistryHybam } from '../../models/PhysicalChemistryHybam'
import { IObservationHybamCollectorRepository } from '../IObservationHybamCollectorRepository'

class PhysicalChemistryHybamRepository
  implements IObservationHybamCollectorRepository
{
  private repository: Repository<PhysicalChemistryHybam>

  constructor() {
    this.repository = getRepository(PhysicalChemistryHybam)
  }

  async getLastObservation(): Promise<{ code: string; date: Date }[]> {
    const lastObservations = await this.repository
      .createQueryBuilder()
      .select('station_code', 'code')
      .addSelect('MAX(timestamp)', 'date')
      .groupBy('station_code')
      .getRawMany()
    return lastObservations
  }

  async insertFromCSV(filePath: string, header: string): Promise<void> {
    await insertFromCsvPg(filePath, header, 'physical_chemistry_hybam')
  }

  async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(PhysicalChemistryHybam)
      .execute()
  }
}

export { PhysicalChemistryHybamRepository }
