import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CountStationsByCountryService } from './CountStationsByCountryService'

class CountStationsByCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filters } = request.body

    const countStationsByCountry = container.resolve(
      CountStationsByCountryService
    )
    const stationsCount = await countStationsByCountry.execute(filters)
    return response.json(stationsCount)
  }
}

export { CountStationsByCountryController }
