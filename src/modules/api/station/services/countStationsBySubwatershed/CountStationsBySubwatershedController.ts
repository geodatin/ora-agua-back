import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CountStationsBySubwatershedService } from './CountStationsBySubwatershedService'

class CountStationsBySubwatershedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, order } = request.query
    const countStationsByTypeService = container.resolve(
      CountStationsBySubwatershedService
    )
    const stationsCount = await countStationsByTypeService.execute({
      page: page ? Number(page) : 1,
      order: order ? String(order) : 'asc',
    })
    return response.json(stationsCount)
  }
}

export { CountStationsBySubwatershedController }
