import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CountStationsByNetworkService } from './CountStationsByNetworkService'

class CountStationsByNetworkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filters } = request.body

    const countStationsByNetworkService = container.resolve(
      CountStationsByNetworkService
    )
    const stationsCount = await countStationsByNetworkService.execute(filters)
    return response.json(stationsCount)
  }
}

export { CountStationsByNetworkController }
