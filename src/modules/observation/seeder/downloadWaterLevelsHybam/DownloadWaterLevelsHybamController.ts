import { container } from 'tsyringe'

import { DownloadWaterLevelsHybamSeeder } from './DownloadWaterLevelsHybamSeeder'

class DownloadWaterLevelsHybamController {
  async start() {
    const seeder = container.resolve(DownloadWaterLevelsHybamSeeder)
    await seeder.execute()
  }
}

export default new DownloadWaterLevelsHybamController()
