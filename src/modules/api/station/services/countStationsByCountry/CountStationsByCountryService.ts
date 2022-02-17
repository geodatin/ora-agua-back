import { inject, injectable } from 'tsyringe'

import { IFiltersDTO } from '../../dtos/IFiltersDTO'
import { IStationViewRepository } from '../../repositories/IStationViewRepository'

@injectable()
class CountStationsByCountryService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute(filters: IFiltersDTO) {
    return await this.stationViewRepository.countStationsByCountry(filters)
  }
}

export { CountStationsByCountryService }
