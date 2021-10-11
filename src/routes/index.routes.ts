import { Router } from 'express'

import { stationRoutes } from './station.routes'

const routes = Router()

routes.use('/station', stationRoutes)

export { routes }
