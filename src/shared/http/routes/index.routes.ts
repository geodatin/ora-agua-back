import { Router } from 'express'

import { observationRoutes } from './observation.routes'
import { stationRoutes } from './station.routes'

const routes = Router()

routes.use('/station', stationRoutes)
routes.use('/observation', observationRoutes)

export { routes }
