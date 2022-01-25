import { Request, Response } from 'express'
import json2csv from 'json2csv'
import { container } from 'tsyringe'

import { CountStationsByCountryService } from './CountStationsByCountryService'

class CountStationsByCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filters } = request.body
    const { format } = request.query

    const countStationsByCountry = container.resolve(
      CountStationsByCountryService
    )

    const stationsCount = await countStationsByCountry.execute(filters)

    if (format === 'csv') {
      const fields = ['country', 'count']
      const csv = json2csv.parse(stationsCount, { fields })
      return response.attachment('countries.csv').status(200).send(csv)
    }

    return response.json(stationsCount)
  }
}

export { CountStationsByCountryController }
