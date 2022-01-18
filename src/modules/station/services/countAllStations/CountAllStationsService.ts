import { IStationViewRepository } from '@modules/station/repositories/IStationViewRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class CountAllStationsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute() {
    const count = await this.stationViewRepository.countAllStations()
    return { count }
  }
}

export { CountAllStationsService }
