import { PhysicalChemistryHybam } from '@modules/observation/models/PhysicalChemistryHybam'
import { insertFromCsvPg } from '@utils/insertFromCsvPg'
import { getConnection, getRepository, Repository } from 'typeorm'

import { IObservationHybamRepository } from '../IObservationHybamRepository'

class PhysicalChemistryHybamRepository implements IObservationHybamRepository {
  private repository: Repository<PhysicalChemistryHybam>

  constructor() {
    this.repository = getRepository(PhysicalChemistryHybam)
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
