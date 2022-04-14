import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetAllStationsPointsService } from './GetAllStationsPointsService'

export class GetAllStationsPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllStationsPointsService = container.resolve(
      GetAllStationsPointsService
    )
    const stations = await getAllStationsPointsService.execute()
    return response.json(stations)
  }
}
