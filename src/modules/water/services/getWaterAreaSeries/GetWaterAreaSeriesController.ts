import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetWaterAreaSeriesService } from './GetWaterAreaSeriesService'

class GetWaterAreaSeriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getWaterAreaSeriesService = container.resolve(
      GetWaterAreaSeriesService
    )
    const data = await getWaterAreaSeriesService.execute()
    return response.json(data)
  }
}

export { GetWaterAreaSeriesController }
