import 'reflect-metadata'
import './shared/container'

import { createConnection } from 'typeorm'

import insertObservationFromApiController from './modules/observation/seeder/insertObservationFromApi/insertObservationFromApiController'
import insertStationController from './modules/station/seeders/insertStation/InsertStationController'

createConnection().then(async () => {
  // await insertStationController.start()
  await insertObservationFromApiController.start()
})
