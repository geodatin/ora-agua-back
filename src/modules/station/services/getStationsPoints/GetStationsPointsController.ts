import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetStationsPointsService } from './GetStationsPointsService'

class GetStationsPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getStationsPointsService = container.resolve(GetStationsPointsService)
    const stations = await getStationsPointsService.execute()
    return response.json(stations)
  }
}

export { GetStationsPointsController }
