import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AreaByCountryService } from './AreaByCountryService'

class AreaByCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { year } = request.query
    const service = container.resolve(AreaByCountryService)
    const data = await service.execute({ year: Number(year) })
    return response.json(data)
  }
}

export { AreaByCountryController }
