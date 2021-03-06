import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetStationsPointsService } from './GetStationsPointsService'

class GetStationsPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filters } = request.body

    const getStationsPointsService = container.resolve(GetStationsPointsService)
    const stations = await getStationsPointsService.execute({
      filters,
    })
    return response.json(stations)
  }
}

export { GetStationsPointsController }
