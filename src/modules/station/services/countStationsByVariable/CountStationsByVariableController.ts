import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CountStationsByVariableService } from './CountStationsByVariableService'

class CountStatitonsByVariableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filters } = request.body

    const countStationsByVariableService = container.resolve(
      CountStationsByVariableService
    )

    const count = await countStationsByVariableService.execute(filters)

    return response.json(count)
  }
}

export { CountStatitonsByVariableController }
