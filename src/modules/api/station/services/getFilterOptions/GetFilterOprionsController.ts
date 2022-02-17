import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetFilterOptionsService } from './GetFilterOptionsService'

export class GetFilterOptionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filterTerm } = request.params
    const getFilterOptionsService = container.resolve(GetFilterOptionsService)
    const options = await getFilterOptionsService.execute(filterTerm)
    return response.json(options)
  }
}
