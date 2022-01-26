import { FrequencyType } from '@modules/observation/types/FrequencyType'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { TimeSeriesService } from './TimeSeriesService'

class TimeSeriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { stationCode, dataType, frequency } = request.params
    const service = container.resolve(TimeSeriesService)
    const timeSeries = await service.execute(
      Number(stationCode),
      dataType,
      frequency as FrequencyType
    )
    return response.json(timeSeries)
  }
}

export { TimeSeriesController }
