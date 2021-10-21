import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { TimeSeriesService } from './TimeSeriesService'

class TimeSeriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { stationCode, dataType } = request.params
    const service = container.resolve(TimeSeriesService)
    const timeSeries = await service.execute(
      Number(stationCode),
      String(dataType)
    )
    return response.json(timeSeries)
  }
}

export { TimeSeriesController }
