import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CountStationsByCountryService } from './CountStationsByCountryService'

class CountStationsByCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, order } = request.query
    const countStationsByCountry = container.resolve(
      CountStationsByCountryService
    )
    const stationsCount = await countStationsByCountry.execute({
      page: page ? Number(page) : 1,
      order: order ? String(order) : 'asc',
    })
    return response.json(stationsCount)
  }
}

export { CountStationsByCountryController }
