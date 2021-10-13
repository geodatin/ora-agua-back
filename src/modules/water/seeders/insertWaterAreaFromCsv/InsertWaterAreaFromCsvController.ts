import { container } from 'tsyringe'

import { InsertWaterAreaFromCsvSeeder } from './InsertWaterAreaFromCsvSeeder'

class InsertWaterAreaFromCsvController {
  async start() {
    const insertWaterAreaFromCsvSeeder = container.resolve(
      InsertWaterAreaFromCsvSeeder
    )
    await insertWaterAreaFromCsvSeeder.execute()
  }
}

export default new InsertWaterAreaFromCsvController()
