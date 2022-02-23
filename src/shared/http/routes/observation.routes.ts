import { LastObservationController } from '@modules/api/observation/services/lastObservation/LastObservationController'
import { LastUpdateController } from '@modules/api/observation/services/lastUpdate/LastUpdateController'
import { TimeSeriesController } from '@modules/api/observation/services/timeSeries/TimeSeriesController'
import { Router } from 'express'

const observationRoutes = Router()

const lastObservationController = new LastObservationController()
const timeSeriesController = new TimeSeriesController()
const lastUpdateControler = new LastUpdateController()

observationRoutes.post('/last/:frequency', lastObservationController.handle)
observationRoutes.get(
  '/timeSeries/:network/:stationCode/:dataType/:frequency',
  timeSeriesController.handle
)

observationRoutes.get('/lastUpdate', lastUpdateControler.handle)

export { observationRoutes }
