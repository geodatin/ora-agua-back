import 'reflect-metadata'
import '../container'
import downloadObservationCsvsController from '@modules/observation/seeder/downloadObservationCsvs/DownloadObservationCsvsController'
import insertObservationFromApiController from '@modules/observation/seeder/insertObservationFromApi/insertObservationFromApiController'
import insertStationController from '@modules/station/seeders/insertStation/InsertStationController'
import insertWaterAreaFromCsvController from '@modules/water/seeders/insertWaterAreaFromCsv/InsertWaterAreaFromCsvController'
import env from 'dotenv-safe'
import { createConnection } from 'typeorm'

env.config()
createConnection().then(async () => {
  // await insertStationController.start()
  await insertObservationFromApiController.start()
  // await insertWaterAreaFromCsvController.start()
  // await downloadObservationCsvsController.start()
})
