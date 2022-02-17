import { container } from 'tsyringe'

import { InsertStationSenhamiSeeder } from './InsertStationSenhamiSeeder'

class InsertStationController {
  async start() {
    const insertStationSenhamiSeeder = container.resolve(
      InsertStationSenhamiSeeder
    )
    await insertStationSenhamiSeeder.execute()
  }
}

export default new InsertStationController()
