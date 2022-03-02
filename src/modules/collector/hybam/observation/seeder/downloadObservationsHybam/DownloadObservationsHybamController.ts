import { container } from 'tsyringe'

import { DownloadObservationsHybamSeeder } from './DownloadObservationsHybamSeeder'

class DownloadObservationsHybamController {
  async start() {
    const seeder = container.resolve(DownloadObservationsHybamSeeder)
    await seeder.execute()
  }
}

export default new DownloadObservationsHybamController()
