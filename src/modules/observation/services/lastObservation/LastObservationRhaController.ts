import { FrequencyType } from '@modules/observation/types/FrequencyType'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { LastObservationRhaService } from './LastObservationRhaService'

export class LastObservationRhaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query
    const { frequency } = request.params
    const { filters } = request.body
    const service = container.resolve(LastObservationRhaService)
    const data = await service.execute({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
      frequency: frequency as FrequencyType,
      filters,
    })
    return response.json(data)
  }
}
