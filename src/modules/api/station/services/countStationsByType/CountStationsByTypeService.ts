import { IStationRepository } from '@modules/collector/ana/station/repositories/IStationRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class CountStationsByTypeService {
  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository
  ) {}

  async execute() {
    const [{ count: fluviometricCount }, { count: pluviometricCount }] =
      await this.stationRepository.countStationsByType()
    return { fluviometricCount, pluviometricCount }
  }
}

export { CountStationsByTypeService }
