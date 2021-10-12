import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CountStationsByResponsibleService } from './CountStationsByResponsibleService'

class CountStationsByResponsibleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, order } = request.query
    const countStationsByResponsibleService = container.resolve(
      CountStationsByResponsibleService
    )
    const stationsCount = await countStationsByResponsibleService.execute({
      page: Number(page),
      order: String(order),
    })
    return response.json(stationsCount)
  }
}

export { CountStationsByResponsibleController }
