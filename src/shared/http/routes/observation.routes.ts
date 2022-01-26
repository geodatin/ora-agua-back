import { LastObservationController } from '@modules/observation/services/lastObservation/LastObservationController'
import { TimeSeriesController } from '@modules/observation/services/timeSeries/TimeSeriesController'
import { Router } from 'express'

const observationRoutes = Router()

const lastObservationController = new LastObservationController()
const timeSeriesController = new TimeSeriesController()

observationRoutes.get('/last/:frequency', lastObservationController.handle)
observationRoutes.get(
  '/timeSeries/:stationCode/:dataType',
  timeSeriesController.handle
)

export { observationRoutes }
