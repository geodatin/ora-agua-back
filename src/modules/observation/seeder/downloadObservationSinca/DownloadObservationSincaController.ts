import { container } from 'tsyringe'

import { DownloadObservationSincaSeeder } from './DownloadObservationSincaSeeder'

class DownloadObservationSincaController {
  async start() {
    const seeder = container.resolve(DownloadObservationSincaSeeder)
    await seeder.execute()
  }
}

export default new DownloadObservationSincaController()
