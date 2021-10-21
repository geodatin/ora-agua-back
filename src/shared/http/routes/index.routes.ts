import { Router } from 'express'

import { observationRoutes } from './observation.routes'
import { stationRoutes } from './station.routes'
import { waterAreaRoutes } from './waterArea.routes'

const routes = Router()

routes.use('/station', stationRoutes)
routes.use('/observation', observationRoutes)
routes.use('/water', waterAreaRoutes)

export { routes }
