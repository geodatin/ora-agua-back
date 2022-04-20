import 'reflect-metadata'
import '../container'
import downloadObservationCsvsController from '@modules/collector/ana/observation/seeder/downloadObservationCsvs/DownloadObservationCsvsController'
import insertObservationFromApiController from '@modules/collector/ana/observation/seeder/insertObservationFromApi/insertObservationFromApiController'
import insertStationController from '@modules/collector/ana/station/seeders/insertStation/InsertStationController'
import downloadDischargesHybamController from '@modules/collector/hybam/observation/seeder/downloadDischargesHybam/DownloadDischargesHybamController'
import downloadGeochemistryHybamController from '@modules/collector/hybam/observation/seeder/downloadGeochemistryHybam/DownloadGeochemistryHybamController'
import downloadObservationsHybamController from '@modules/collector/hybam/observation/seeder/downloadObservationsHybam/DownloadObservationsHybamController'
import downloadPhysicalChemistryHybamController from '@modules/collector/hybam/observation/seeder/downloadPhysicalChemistryHybam/DownloadPhysicalChemistryHybamController'
import downloadSedimentsHybamController from '@modules/collector/hybam/observation/seeder/downloadSedimentsHybam/DownloadSedimentsHybamController'
import downloadWaterLevelsHybamController from '@modules/collector/hybam/observation/seeder/downloadWaterLevelsHybam/DownloadWaterLevelsHybamController'
import insertStationsHybamController from '@modules/collector/hybam/station/seeders/insertStationsHybam/InsertStationsHybamController'
import downloadObservationIdeamController from '@modules/collector/ideam/observation/seeder/downloadObservationIdeam/DownloadObservationIdeamController'
import downloadWaterQualityIdeamController from '@modules/collector/ideam/observation/seeder/downloadWaterQualityIdeam/DownloadWaterQualityIdeamController'
import insertStationsIdeamController from '@modules/collector/ideam/station/seeders/insertStationsIdeam/InsertStationsIdeamController'
import insertObservationSenhamiController from '@modules/collector/senhami/observation/seeder/insertObservationSenhami/InsertObservationSenhamiController'
import insertObservationSenhamiPeController from '@modules/collector/senhami/observation/seeder/insertObservationSenhamiPe/InsertObservationSenhamiPeController'
import downloadWaterQualitySincaController from '@modules/collector/sinca/observation/seeder/downloadWaterQualitySinca/DownloadWaterQualitySincaController'
import insertStationsSincaController from '@modules/collector/sinca/station/seeders/insertStationsSinca/InsertStationsSincaController'
import { log } from '@utils/log'
import env from 'dotenv-safe'
import cron from 'node-cron'
import { getConnection } from 'typeorm'
import '../database'

const hoursInterval = 2

env.config()
log(`Running seeders every ${hoursInterval} hours`)
const task = cron.schedule(`0 */${hoursInterval} * * *`, seed, {
  scheduled: true,
  timezone: 'America/Sao_Paulo',
})
task.start()

async function seed() {
  try {
    const connection = getConnection()
    log(`Seed started`)
    // await insertStationController.start()
    // await downloadObservationCsvsController.start()

    await insertObservationFromApiController.start()
    await insertObservationSenhamiController.start()
    await insertObservationSenhamiPeController.start()

    // await insertStationsSincaController.start()
    await downloadWaterQualitySincaController.start()

    // await insertStationsIdeamController.start()
    await downloadObservationIdeamController.start()
    await downloadWaterQualityIdeamController.start()
    await downloadObservationsHybamController.start()

    // await insertStationsHybamController.start()
    // await downloadWaterLevelsHybamController.start()
    // await downloadDischargesHybamController.start()
    // await downloadSedimentsHybamController.start()
    // await downloadPhysicalChemistryHybamController.start()
    // await downloadGeochemistryHybamController.start()

    await connection
      .createQueryRunner()
      .query('REFRESH MATERIALIZED VIEW station_view')

    await connection
      .createQueryRunner()
      .query('REFRESH MATERIALIZED VIEW observation_rha_view')

    await connection
      .createQueryRunner()
      .query('REFRESH MATERIALIZED VIEW observation_rha_list_view')

    await connection
      .createQueryRunner()
      .query('REFRESH MATERIALIZED VIEW last_update_view')

    await connection
      .createQueryRunner()
      .query('REFRESH MATERIALIZED VIEW observation_rqa_view')

    log(`Seed finished`)
  } catch (error) {
    console.log(error)
  }
}
/* 
createConnection().then(async (connection) => {
  // await insertStationController.start()
  // await downloadObservationCsvsController.start()

  await insertObservationFromApiController.start()
  // await insertObservationSenhamiController.start()
  await insertObservationSenhamiPeController.start()

  // await insertStationsSincaController.start()
  await downloadWaterQualitySincaController.start()

  // await insertStationsIdeamController.start()
  await downloadObservationIdeamController.start()
  await downloadWaterQualityIdeamController.start()
  await downloadObservationsHybamController.start()

  // await insertStationsHybamController.start()
  // await downloadWaterLevelsHybamController.start()
  // await downloadDischargesHybamController.start()
  // await downloadSedimentsHybamController.start()
  // await downloadPhysicalChemistryHybamController.start()
  // await downloadGeochemistryHybamController.start()
  await connection.close()
}) */
