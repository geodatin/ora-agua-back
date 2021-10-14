import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AmazonicAreaService } from './AmazonicAreaService'

class AmazonicAreaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { country, year } = request.query
    const service = container.resolve(AmazonicAreaService)
    const area = await service.execute({
      country: country ? String(country) : null,
      year: year ? Number(year) : null,
    })
    return response.json({ count: area })
  }
}

export { AmazonicAreaController }
