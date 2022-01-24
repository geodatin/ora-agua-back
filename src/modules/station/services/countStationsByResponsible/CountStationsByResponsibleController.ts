import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CountStationsByResponsibleService } from './CountStationsByResponsibleService'

class CountStationsByResponsibleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filters } = request.body

    const countStationsByResponsibleService = container.resolve(
      CountStationsByResponsibleService
    )
    const stationsCount = await countStationsByResponsibleService.execute(
      filters
    )
    return response.json(stationsCount)
  }
}

export { CountStationsByResponsibleController }
