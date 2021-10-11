import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CountStationsByTypeService } from './CountStationsByTypeService'

class CountStationsByTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const countStationsByTypeService = container.resolve(
      CountStationsByTypeService
    )
    const stationsCount = await countStationsByTypeService.execute()
    return response.json(stationsCount)
  }
}

export { CountStationsByTypeController }
