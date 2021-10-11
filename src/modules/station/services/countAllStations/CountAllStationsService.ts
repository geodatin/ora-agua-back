import { IStationRepository } from '@modules/station/repositories/IStationRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class CountAllStationsService {
  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository
  ) {}

  async execute() {
    return this.stationRepository.countAllStations()
  }
}

export { CountAllStationsService }
