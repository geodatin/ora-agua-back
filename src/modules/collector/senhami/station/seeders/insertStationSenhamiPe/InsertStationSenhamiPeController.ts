import { container } from 'tsyringe'

import { InsertStationSenhamiPeSeeder } from './InsertStationSenhamiPeSeeder'

class InsertStationSenhamiPeController {
  async start() {
    const insertStationSenhamiPeSeeder = container.resolve(
      InsertStationSenhamiPeSeeder
    )
    await insertStationSenhamiPeSeeder.execute()
  }
}

export default new InsertStationSenhamiPeController()
