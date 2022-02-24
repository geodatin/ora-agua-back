import { LastUpdateController } from '@modules/api/observation/services/lastUpdate/LastUpdateController'
import { ListObservationController } from '@modules/api/observation/services/listObservation/ListObservationController'
import { TimeSeriesController } from '@modules/api/observation/services/timeSeries/TimeSeriesController'
import { Router } from 'express'

const observationRoutes = Router()

const listObservationController = new ListObservationController()
const timeSeriesController = new TimeSeriesController()
const lastUpdateControler = new LastUpdateController()

observationRoutes.post('/list/:frequency', listObservationController.handle)
observationRoutes.get(
  '/timeSeries/:network/:stationCode/:dataType/:frequency',
  timeSeriesController.handle
)

observationRoutes.get('/lastUpdate', lastUpdateControler.handle)

export { observationRoutes }
