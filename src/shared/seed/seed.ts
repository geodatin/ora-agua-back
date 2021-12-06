import 'reflect-metadata'
import '../container'
import downloadDischargesHybamController from '@modules/observation/seeder/downloadDischargesHybam/DownloadDischargesHybamController'
import downloadObservationCsvsController from '@modules/observation/seeder/downloadObservationCsvs/DownloadObservationCsvsController'
import downloadWaterLevelsHybamController from '@modules/observation/seeder/downloadWaterLevelsHybam/DownloadWaterLevelsHybamController'
import insertObservationFromApiController from '@modules/observation/seeder/insertObservationFromApi/insertObservationFromApiController'
import insertStationController from '@modules/station/seeders/insertStation/InsertStationController'
import insertStationsHybamController from '@modules/station/seeders/insertStationsHybam/InsertStationsHybamController'
import insertWaterAreaFromCsvController from '@modules/water/seeders/insertWaterAreaFromCsv/InsertWaterAreaFromCsvController'
import env from 'dotenv-safe'
import { createConnection } from 'typeorm'

env.config()
createConnection().then(async () => {
  // await insertStationController.start()
  // await insertObservationFromApiController.start()
  // await insertWaterAreaFromCsvController.start()
  // await downloadObservationCsvsController.start()

  // await insertStationsHybamController.start()
  // await downloadWaterLevelsHybamController.start()
  await downloadDischargesHybamController.start()
})
