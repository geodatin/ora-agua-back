import { container } from 'tsyringe'

import { InsertStationsIdeamSeeder } from './InsertStationsIdeamSeeder'

class InsertStationIdeamController {
  async start() {
    const insertStationsIdeamSeeder = container.resolve(
      InsertStationsIdeamSeeder
    )
    await insertStationsIdeamSeeder.execute()
  }
}

export default new InsertStationIdeamController()
