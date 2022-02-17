import { container } from 'tsyringe'

import { InsertObservationSenhamiPeSeeder } from './InsertObservationSenhamiPeSeeder'

class InsertStationSenhamiController {
  async start() {
    const insertObservationSenhamiPeSeeder = container.resolve(
      InsertObservationSenhamiPeSeeder
    )
    await insertObservationSenhamiPeSeeder.execute()
  }
}

export default new InsertStationSenhamiController()
