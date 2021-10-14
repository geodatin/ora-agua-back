import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { VarianceRankingService } from './VarianceRankingService'

class VarianceRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order } = request.query
    const { finalYear, initialYear } = request.params
    const service = container.resolve(VarianceRankingService)
    const data = await service.execute({
      order: order ? String(order) : 'asc',
      initialYear: Number(initialYear),
      finalYear: Number(finalYear),
    })
    return response.json(data)
  }
}

export { VarianceRankingController }
