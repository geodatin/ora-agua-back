import { container } from 'tsyringe'

import { InsertObservationFromApiSeeder } from './insertObservationFromApiSeeder'

class InsertObservationFromApiController {
  async start() {
    const insertObservationFromApiSeeder = container.resolve(
      InsertObservationFromApiSeeder
    )
    await insertObservationFromApiSeeder.execute()
  }
}

export default new InsertObservationFromApiController()
