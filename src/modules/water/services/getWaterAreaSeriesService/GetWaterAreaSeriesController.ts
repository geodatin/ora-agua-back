import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetWaterAreaSeriesService } from './GetWaterAreaSeriesService'

class GetWaterAreaSeriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { order } = request.query
    const { country } = request.params
    const getWaterAreaSeriesService = container.resolve(
      GetWaterAreaSeriesService
    )
    const data = await getWaterAreaSeriesService.execute({
      country,
      order: order ? String(order) : null,
    })
    return response.json(data)
  }
}

export { GetWaterAreaSeriesController }
