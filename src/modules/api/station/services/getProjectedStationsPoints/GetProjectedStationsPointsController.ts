import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetProjectedStationsPointsService } from './GetProjectedStationsPointsService'

export class GetProjectedStationsPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { network } = request.query
    const getProjectedStationsPointsService = container.resolve(
      GetProjectedStationsPointsService
    )
    const stations = await getProjectedStationsPointsService.execute(
      String(network)
    )
    return response.json(stations)
  }
}
