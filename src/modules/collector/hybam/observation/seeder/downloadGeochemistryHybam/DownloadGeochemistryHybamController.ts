import { container } from 'tsyringe'

import { DownloadGeochemistryHybamSeeder } from './DownloadGeochemistryHybamSeeder'

class DownloadGeochemistryHybamController {
  async start() {
    const seeder = container.resolve(DownloadGeochemistryHybamSeeder)
    await seeder.execute()
  }
}

export default new DownloadGeochemistryHybamController()
