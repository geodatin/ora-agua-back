import { FrequencyType } from '@modules/observation/types/FrequencyType'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { TimeSeriesService } from './TimeSeriesService'

class TimeSeriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { stationCode, dataType, frequency } = request.params
    const { format } = request.query
    const service = container.resolve(TimeSeriesService)
    const timeSeries = await service.execute(
      stationCode,
      dataType,
      frequency as FrequencyType,
      String(format)
    )

    if (format === 'csv') {
      return response.attachment('timeSeries.csv').status(200).send(timeSeries)
    }

    return response.json(timeSeries)
  }
}

export { TimeSeriesController }
