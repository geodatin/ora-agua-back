import { Router } from 'express'

import { stationRoutes } from './station.routes'
import { waterAreaRoutes } from './waterArea.routes'

const routes = Router()

routes.use('/station', stationRoutes)
routes.use('/water', waterAreaRoutes)

export { routes }
