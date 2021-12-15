import path from 'path'
import system from 'system-commands'
import { injectable } from 'tsyringe'

@injectable()
class InsertWaterAreaFromCsvSeeder {
  constructor() {}
  async execute(): Promise<void> {
    const file = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      'tmp',
      'water-area.csv'
    )
    const table = 'water_area'
    const output = await system(
      `PGPASSWORD=${process.env.DB_PASSWORD} psql -h ${process.env.DB_HOST} -U ${process.env.DB_USER} -d ${process.env.DB_NAME} -c "\\copy ${table} FROM '${file}' with (format csv,header true, delimiter ',');"`
    )
    console.log(output)
  }
}

export { InsertWaterAreaFromCsvSeeder }
