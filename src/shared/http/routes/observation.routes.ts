import { LastObservationController } from '@modules/observation/services/lastObservation/LastObservationController'
import { Router } from 'express'

const observationRoutes = Router()

const lastObservationController = new LastObservationController()

observationRoutes.get('/last', lastObservationController.handle)

export { observationRoutes }
