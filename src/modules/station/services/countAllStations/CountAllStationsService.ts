import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'
import { IStationViewRepository } from '@modules/station/repositories/IStationViewRepository'
import { inject, injectable } from 'tsyringe'

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
