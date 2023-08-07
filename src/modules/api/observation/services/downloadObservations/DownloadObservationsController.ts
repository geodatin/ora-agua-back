import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DownloadObservationsService } from './DownloadObservationsService'

export class DownloadObservationsController {
  async handle(request: Request, response: Response): Promise<void> {
    const { stationCode } = request.params
    const service = container.resolve(DownloadObservationsService)
    const { filePath, done } = await service.execute(stationCode)
    if (done) {
      response.download(filePath)
    }
    // return response.end()
  }
}
