import { ILastUpdateViewRepository } from '@modules/observation/repositories/ILastUpdateViewRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class LastUpdateService {
  constructor(
    @inject('LastUpdateViewRepository')
    private lastUpdateViewRepository: ILastUpdateViewRepository
  ) {}

  async execute() {
    const lastUpdate = await this.lastUpdateViewRepository.getLastUpdate()
    return { lastUpdate }
  }
}
