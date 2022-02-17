import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CountAllStationsService } from './CountAllStationsService'

class CountAllStationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filters } = request.body

    const countAllStationsService = container.resolve(CountAllStationsService)
    const stationsCount = await countAllStationsService.execute(filters)
    return response.json(stationsCount)
  }
}

export { CountAllStationsController }
