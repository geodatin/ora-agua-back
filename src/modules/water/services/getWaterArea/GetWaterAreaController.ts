import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetWaterAreaService } from './GetWaterAreaService'

class GetWaterAreaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { country, year } = request.query
    const getWaterAreaService = container.resolve(GetWaterAreaService)
    const area = await getWaterAreaService.execute({
      country: country ? String(country) : null,
      year: year ? Number(year) : null,
    })
    return response.json({ count: area })
  }
}

export { GetWaterAreaController }
