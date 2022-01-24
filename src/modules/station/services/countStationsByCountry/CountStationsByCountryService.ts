import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'
import { IStationViewRepository } from '@modules/station/repositories/IStationViewRepository'
import { inject, injectable } from 'tsyringe'

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
