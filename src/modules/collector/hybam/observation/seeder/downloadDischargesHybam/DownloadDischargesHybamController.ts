import { container } from 'tsyringe'

import { DownloadDischargesHybamSeeder } from './DownloadDischargesHybamSeeder'

class DownloadDischargesHybamController {
  async start() {
    const seeder = container.resolve(DownloadDischargesHybamSeeder)
    await seeder.execute()
  }
}

export default new DownloadDischargesHybamController()
