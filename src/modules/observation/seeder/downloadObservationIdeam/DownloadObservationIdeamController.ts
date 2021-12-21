import { container } from 'tsyringe'

import { DownloadObservationIdeamSeeder } from './DownloadObservationIdeamSeeder'

class DownloadObservationIdeamController {
  async start() {
    const seeder = container.resolve(DownloadObservationIdeamSeeder)
    await seeder.execute()
  }
}

export default new DownloadObservationIdeamController()
