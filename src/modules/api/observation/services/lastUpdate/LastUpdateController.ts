import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { LastUpdateService } from './LastUpdateService'

export class LastUpdateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(LastUpdateService)
    const lastUpdate = await service.execute()
    return response.json(lastUpdate)
  }
}
