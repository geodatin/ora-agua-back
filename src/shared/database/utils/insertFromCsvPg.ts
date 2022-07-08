import fs from 'fs'
import { Pool } from 'pg'
import { from as copyFrom } from 'pg-copy-streams'

export async function insertFromCsvPg(
  filePath: string,
  header: string,
  table: string
) {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  })

  const client = await pool.connect()
  const stream = client.query(
    copyFrom(
      `COPY ${process.env.SCHEMA}.${table}(${header}) FROM STDIN with (format csv,header true, delimiter ',')`
    )
  )
  const fileStream = fs.createReadStream(filePath)
  const copyPromise = new Promise((resolve, reject) => {
    fileStream.on('error', reject)
    stream.on('error', reject)
    stream.on('finish', resolve)
    fileStream.pipe(stream)
  })
  await copyPromise
  client.release()
}
