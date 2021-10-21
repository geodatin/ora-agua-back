import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { LastObservationService } from './LastObservationService'

class LastObservationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query
    const service = container.resolve(LastObservationService)
    const data = await service.execute({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
    })
    return response.json(data)
  }
}

export { LastObservationController }
