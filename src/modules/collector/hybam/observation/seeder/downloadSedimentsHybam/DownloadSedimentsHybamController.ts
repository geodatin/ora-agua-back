import { container } from 'tsyringe'

import { DownloadSedimentsHybamSeeder } from './DownloadSedimentsHybamSeeder'

class DownloadSedimentsHybamController {
  async start() {
    const seeder = container.resolve(DownloadSedimentsHybamSeeder)
    await seeder.execute()
  }
}

export default new DownloadSedimentsHybamController()
