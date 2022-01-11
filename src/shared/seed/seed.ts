import 'reflect-metadata'
import '../container'
import downloadDischargesHybamController from '@modules/observation/seeder/downloadDischargesHybam/DownloadDischargesHybamController'
import downloadGeochemistryHybamController from '@modules/observation/seeder/downloadGeochemistryHybam/DownloadGeochemistryHybamController'
import downloadObservationCsvsController from '@modules/observation/seeder/downloadObservationCsvs/DownloadObservationCsvsController'
import downloadObservationIdeamController from '@modules/observation/seeder/downloadObservationIdeam/DownloadObservationIdeamController'
import downloadObservationSincaController from '@modules/observation/seeder/downloadObservationSinca/DownloadObservationSincaController'
import downloadPhysicalChemistryHybamController from '@modules/observation/seeder/downloadPhysicalChemistryHybam/DownloadPhysicalChemistryHybamController'
import downloadSedimentsHybamController from '@modules/observation/seeder/downloadSedimentsHybam/DownloadSedimentsHybamController'
import downloadWaterLevelsHybamController from '@modules/observation/seeder/downloadWaterLevelsHybam/DownloadWaterLevelsHybamController'
import downloadWaterQualityIdeamController from '@modules/observation/seeder/downloadWaterQualityIdeam/DownloadWaterQualityIdeamController'
import insertObservationFromApiController from '@modules/observation/seeder/insertObservationFromApi/insertObservationFromApiController'
import insertStationController from '@modules/station/seeders/insertStation/InsertStationController'
import insertStationsHybamController from '@modules/station/seeders/insertStationsHybam/InsertStationsHybamController'
import insertStationsIdeamController from '@modules/station/seeders/insertStationsIdeam/InsertStationsIdeamController'
import insertStationsSincaController from '@modules/station/seeders/insertStationsSinca/InsertStationsSincaController'
import insertWaterAreaFromCsvController from '@modules/water/seeders/insertWaterAreaFromCsv/InsertWaterAreaFromCsvController'
import { log } from '@utils/log'
import env from 'dotenv-safe'
import cron from 'node-cron'
import { createConnection } from 'typeorm'

const hoursInterval = 12

env.config()
log(`Running seeders every ${hoursInterval} hours`)
const task = cron.schedule(
  `0 */${hoursInterval} * * *`,
  async () => {
    const connection = await createConnection()
    // await insertStationController.start()
    // await insertObservationFromApiController.start()
    // await insertWaterAreaFromCsvController.start()
    // await downloadObservationCsvsController.start()

    await insertStationsSincaController.start()
    await downloadObservationSincaController.start()

    await insertStationsIdeamController.start()
    await downloadObservationIdeamController.start()
    await downloadWaterQualityIdeamController.start()

    await insertStationsHybamController.start()
    await downloadWaterLevelsHybamController.start()
    await downloadDischargesHybamController.start()
    await downloadSedimentsHybamController.start()
    await downloadPhysicalChemistryHybamController.start()
    await downloadGeochemistryHybamController.start()

    connection.close()
  },
  {
    scheduled: true,
    timezone: 'America/Sao_Paulo',
  }
)
task.start()
