import { inject, injectable } from 'tsyringe'

import { ILastUpdateViewRepository } from '../../repositories/ILastUpdateViewRepository'

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
