import { LastObservationRhaController } from '@modules/observation/services/lastObservation/LastObservationRhaController'
import { LastUpdateController } from '@modules/observation/services/lastUpdate/LastUpdateController'
import { TimeSeriesController } from '@modules/observation/services/timeSeries/TimeSeriesController'
import { Router } from 'express'

const observationRoutes = Router()

const lastObservationRhaController = new LastObservationRhaController()
const timeSeriesController = new TimeSeriesController()
const lastUpdateControler = new LastUpdateController()

observationRoutes.post('/last/:frequency', lastObservationRhaController.handle)
observationRoutes.get(
  '/timeSeries/:stationCode/:dataType/:frequency',
  timeSeriesController.handle
)

observationRoutes.get('/lastUpdate', lastUpdateControler.handle)

export { observationRoutes }
