import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetProjectedStationsPointsService } from './GetProjectedStationsPointsService'

export class GetProjectedStationsPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getProjectedStationsPointsService = container.resolve(
      GetProjectedStationsPointsService
    )
    const stations = await getProjectedStationsPointsService.execute()
    return response.json(stations)
  }
}
