import { container } from 'tsyringe'

import { InsertStationsSincaSeeder } from './InsertStationsSincaSeeder'

class InsertStationSincaController {
  async start() {
    const insertStationsSincaSeeder = container.resolve(
      InsertStationsSincaSeeder
    )
    await insertStationsSincaSeeder.execute()
  }
}

export default new InsertStationSincaController()
