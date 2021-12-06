import { MonthlyDischargeHybam } from '@modules/observation/models/MonthlyDischargeHybam'
import fs from 'fs'
import { Pool } from 'pg'
import { from as copyFrom } from 'pg-copy-streams'
import { getConnection, getRepository, Repository } from 'typeorm'

import { IMonthlyDischargeHybamRepository } from '../IMonthlyDischargeHybamRepository'

class MonthlyDischargeHybamRepository
  implements IMonthlyDischargeHybamRepository
{
  private repository: Repository<MonthlyDischargeHybam>

  constructor() {
    this.repository = getRepository(MonthlyDischargeHybam)
  }

  async insertFromCSV(filePath: string, header: string): Promise<void> {
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
    })

    const client = await pool.connect()
    const stream = client.query(
      copyFrom(
        `COPY monthly_discharge_hybam(${header}) FROM STDIN with (format csv,header true, delimiter ',')`
      )
    )
    const fileStream = fs.createReadStream(filePath)
    const promise = new Promise((resolve, reject) => {
      fileStream.on('error', reject)
      stream.on('error', reject)
      stream.on('finish', resolve)
      fileStream.pipe(stream)
    })
    await promise
  }

  async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(MonthlyDischargeHybam)
      .execute()
  }
}

export { MonthlyDischargeHybamRepository }
