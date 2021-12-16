import 'reflect-metadata'
import '../container'
import downloadDischargesHybamController from '@modules/observation/seeder/downloadDischargesHybam/DownloadDischargesHybamController'
import downloadGeochemistryHybamController from '@modules/observation/seeder/downloadGeochemistryHybam/DownloadGeochemistryHybamController'
import downloadObservationCsvsController from '@modules/observation/seeder/downloadObservationCsvs/DownloadObservationCsvsController'
import downloadObservationSincaController from '@modules/observation/seeder/downloadObservationSinca/DownloadObservationSincaController'
import downloadPhysicalChemistryHybamController from '@modules/observation/seeder/downloadPhysicalChemistryHybam/DownloadPhysicalChemistryHybamController'
import downloadSedimentsHybamController from '@modules/observation/seeder/downloadSedimentsHybam/DownloadSedimentsHybamController'
import downloadWaterLevelsHybamController from '@modules/observation/seeder/downloadWaterLevelsHybam/DownloadWaterLevelsHybamController'
import insertObservationFromApiController from '@modules/observation/seeder/insertObservationFromApi/insertObservationFromApiController'
import insertStationController from '@modules/station/seeders/insertStation/InsertStationController'
import insertStationsHybamController from '@modules/station/seeders/insertStationsHybam/InsertStationsHybamController'
import insertStationsSincaController from '@modules/station/seeders/insertStationsSinca/InsertStationsSincaController'
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
  // await downloadDischargesHybamController.start()
  // await downloadSedimentsHybamController.start()
  // await downloadPhysicalChemistryHybamController.start()
  // await downloadGeochemistryHybamController.start()

  // await insertStationsSincaController.start()
  await downloadObservationSincaController.start()
})
