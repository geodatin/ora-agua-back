import 'reflect-metadata'
import './shared/container'
import insertWaterAreaFromCsvController from '@modules/water/seeders/insertWaterAreaFromCsv/InsertWaterAreaFromCsvController'
import env from 'dotenv-safe'
import { createConnection } from 'typeorm'

import insertObservationFromApiController from './modules/observation/seeder/insertObservationFromApi/insertObservationFromApiController'
import insertStationController from './modules/station/seeders/insertStation/InsertStationController'

env.config()
createConnection().then(async () => {
  // await insertStationController.start()
  // await insertObservationFromApiController.start()
  await insertWaterAreaFromCsvController.start()
})
