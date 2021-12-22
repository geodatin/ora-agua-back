import { container } from 'tsyringe'

import { InsertObservationSenhamiSeeder } from './InsertObservationSenhamiSeeder'

class InsertStationSenhamiController {
  async start() {
    const insertObservationSenhamiSeeder = container.resolve(
      InsertObservationSenhamiSeeder
    )
    await insertObservationSenhamiSeeder.execute()
  }
}

export default new InsertStationSenhamiController()
