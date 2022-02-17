import { inject, injectable } from 'tsyringe'

import { IFiltersDTO } from '../../dtos/IFiltersDTO'
import { IStationViewRepository } from '../../repositories/IStationViewRepository'

@injectable()
class CountAllStationsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute(filters: IFiltersDTO) {
    const count = await this.stationViewRepository.countAllStations(filters)
    return { count }
  }
}

export { CountAllStationsService }
