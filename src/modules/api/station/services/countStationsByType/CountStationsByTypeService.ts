import { inject, injectable } from 'tsyringe'

@injectable()
class CountStationsByTypeService {
  constructor(
    @inject('StationRepository')
    private stationRepository: any
  ) {}

  async execute() {
    const [{ count: fluviometricCount }, { count: pluviometricCount }] =
      await this.stationRepository.countStationsByType()
    return { fluviometricCount, pluviometricCount }
  }
}

export { CountStationsByTypeService }
