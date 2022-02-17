import { container } from 'tsyringe'

import { InsertStationsHybamSeeder } from './InsertStationsHybamSeeder'

class InsertStationHybamController {
  async start() {
    const insertStationsHybamSeeder = container.resolve(
      InsertStationsHybamSeeder
    )
    await insertStationsHybamSeeder.execute()
  }
}

export default new InsertStationHybamController()
