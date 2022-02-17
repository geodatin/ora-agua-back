import { Request, Response } from 'express'
import json2csv from 'json2csv'
import { container } from 'tsyringe'

import { CountStationsByResponsibleService } from './CountStationsByResponsibleService'

class CountStationsByResponsibleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filters } = request.body
    const { format } = request.query

    const countStationsByResponsibleService = container.resolve(
      CountStationsByResponsibleService
    )
    const stationsCount = await countStationsByResponsibleService.execute(
      filters
    )

    if (format === 'csv') {
      const csv = json2csv.parse(stationsCount.values)
      return response.attachment('responsible.csv').status(200).send(csv)
    }

    return response.json(stationsCount)
  }
}

export { CountStationsByResponsibleController }
