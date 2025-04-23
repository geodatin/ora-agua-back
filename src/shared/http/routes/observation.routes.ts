import { Router } from 'express'

import { DownloadObservationsController } from '../../../modules/api/observation/services/downloadObservations/DownloadObservationsController'
import { LastUpdateController } from '../../../modules/api/observation/services/lastUpdate/LastUpdateController'
import { ListObservationController } from '../../../modules/api/observation/services/listObservation/ListObservationController'
import { TimeSeriesController } from '../../../modules/api/observation/services/timeSeries/TimeSeriesController'

const observationRoutes = Router()

const listObservationController = new ListObservationController()
const timeSeriesController = new TimeSeriesController()
const lastUpdateController = new LastUpdateController()
const downloadObservationsController = new DownloadObservationsController()

observationRoutes.post('/list/:frequency', listObservationController.handle)
observationRoutes.get(
  '/timeSeries/:network/:stationCode/:dataType/:frequency',
  timeSeriesController.handle
)
observationRoutes.get('/lastUpdate', lastUpdateController.handle)
observationRoutes.get(
  '/timeSeries/:stationCode',
  downloadObservationsController.handle
)

export { observationRoutes }
