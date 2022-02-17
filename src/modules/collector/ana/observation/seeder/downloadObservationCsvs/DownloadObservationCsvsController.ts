import { container } from 'tsyringe'

import { DownloadObservationCsvsSeeder } from './DownloadObservationCsvsSeeder'

class DownloadObservationCsvsController {
  async start() {
    const seeder = container.resolve(DownloadObservationCsvsSeeder)
    await seeder.execute()
  }
}

export default new DownloadObservationCsvsController()
