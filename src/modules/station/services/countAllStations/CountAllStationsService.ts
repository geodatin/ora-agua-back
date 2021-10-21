import { IStationRepository } from '@modules/station/repositories/IStationRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class CountAllStationsService {
  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository
  ) {}

  async execute() {
    const countStation = await this.stationRepository.countAllStations()
    const countCountry = await this.stationRepository.countCountries()
    return { countStation: countStation, countCountry: countCountry }
  }
}

export { CountAllStationsService }
