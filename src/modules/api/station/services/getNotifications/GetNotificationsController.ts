import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetNotificationsService } from './GetNotificationsService'

export class GetNotificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filters, limits } = request.body
    const { page, pageSize } = request.query

    const limitsDefault = {
      rainLimits: { superiorLimit: 5, inferiorLimit: 10 },
    }

    const getNotificationsService = container.resolve(GetNotificationsService)
    const notifications = await getNotificationsService.execute({
      filters,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
      limits: limits || limitsDefault,
    })
    return response.json(notifications)
  }
}
