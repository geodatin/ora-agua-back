import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { RankingRiversByStationsService } from './RankingRiversByStationsService'

class RankingRiversByStationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order, page } = request.query
    const { filters } = request.body

    const rankingRiversByStationsService = container.resolve(
      RankingRiversByStationsService
    )

    const ranking = await rankingRiversByStationsService.execute({
      order: order ? String(order).toLowerCase() : 'asc',
      page: page ? Number(page) : 1,
      filters,
    })

    return response.json(ranking)
  }
}

export { RankingRiversByStationsController }
