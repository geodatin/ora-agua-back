import { Request, Response } from 'express'
import json2csv from 'json2csv'
import { container } from 'tsyringe'

import { CountStationsByNetworkService } from './CountStationsByNetworkService'

class CountStationsByNetworkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filters } = request.body
    const { format } = request.query

    const countStationsByNetworkService = container.resolve(
      CountStationsByNetworkService
    )
    const stationsCount = await countStationsByNetworkService.execute(filters)

    if (format === 'csv') {
      const csv = json2csv.parse(stationsCount.values)
      return response.attachment('networks.csv').status(200).send(csv)
    }

    return response.json(stationsCount)
  }
}

export { CountStationsByNetworkController }
