import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetStationsPointsService } from './GetStationsPointsService'

class GetStationsPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { networkType } = request.query
    const countStationsByTypeService = container.resolve(
      GetStationsPointsService
    )
    const stations = await countStationsByTypeService.execute(
      networkType === undefined ? null : String(networkType)
    )
    return response.json(stations)
  }
}

export { GetStationsPointsController }
