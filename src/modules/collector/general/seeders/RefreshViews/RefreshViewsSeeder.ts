import { inject, injectable } from 'tsyringe'

import { IGeneralCollectorRepository } from '../../repositories/IGeneralCollectorRepository'

@injectable()
export class RefreshViewsSeeder {
  constructor(
    @inject('GeneralCollectorRepository')
    private generalCollectorRepository: IGeneralCollectorRepository
  ) {}

  async execute() {
    await this.generalCollectorRepository.refreshViews()
  }
}
