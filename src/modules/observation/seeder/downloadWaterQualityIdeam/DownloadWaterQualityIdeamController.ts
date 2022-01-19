import { container } from 'tsyringe'

import { DownloadWaterQualityIdeamSeeder } from './DownloadWaterQualityIdeamSeeder'

class DownloadWaterQualityIdeamController {
  async start() {
    const seeder = container.resolve(DownloadWaterQualityIdeamSeeder)
    await seeder.execute()
  }
}

export default new DownloadWaterQualityIdeamController()
