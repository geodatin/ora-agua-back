import { container } from 'tsyringe'

import { DownloadWaterQualitySincaSeeder } from './DownloadWaterQualitySincaSeeder'

class DownloadWaterQualitySincaController {
  async start() {
    const seeder = container.resolve(DownloadWaterQualitySincaSeeder)
    await seeder.execute()
  }
}

export default new DownloadWaterQualitySincaController()
