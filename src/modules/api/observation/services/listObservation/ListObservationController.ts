import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { FrequencyType } from '../../types/FrequencyType'
import { ListObservationService } from './ListObservationService'

export class ListObservationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize, stationCode } = request.query
    const { frequency } = request.params
    const { filters } = request.body
    const service = container.resolve(ListObservationService)
    const data = await service.execute({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
      frequency: frequency as FrequencyType,
      filters,
      stationCode: stationCode as string,
    })
    return response.json(data)
  }
}
