import { container } from 'tsyringe'

import { InsertStationSeeder } from './InsertStationSeeder'

class InsertStationController {
  async start() {
    const insertStationSeeder = container.resolve(InsertStationSeeder)
    await insertStationSeeder.execute()
  }
}

export default new InsertStationController()
