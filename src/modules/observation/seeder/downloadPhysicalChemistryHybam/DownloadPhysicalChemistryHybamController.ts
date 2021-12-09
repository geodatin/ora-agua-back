import { container } from 'tsyringe'

import { DownloadPhysicalChemistryHybamSeeder } from './DownloadPhysicalChemistryHybamSeeder'

class DownloadPhysicalChemistryHybamController {
  async start() {
    const seeder = container.resolve(DownloadPhysicalChemistryHybamSeeder)
    await seeder.execute()
  }
}

export default new DownloadPhysicalChemistryHybamController()
