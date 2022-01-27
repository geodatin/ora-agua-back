import { LastObservationRhaController } from '@modules/observation/services/lastObservation/LastObservationRhaController'
import { TimeSeriesController } from '@modules/observation/services/timeSeries/TimeSeriesController'
import { Router } from 'express'

const observationRoutes = Router()

const lastObservationRhaController = new LastObservationRhaController()
const timeSeriesController = new TimeSeriesController()

observationRoutes.post('/last/:frequency', lastObservationRhaController.handle)
observationRoutes.get(
  '/timeSeries/:stationCode/:dataType/:frequency',
  timeSeriesController.handle
)

export { observationRoutes }
