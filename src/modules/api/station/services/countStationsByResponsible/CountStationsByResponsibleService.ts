import { inject, injectable } from 'tsyringe'

import { IFiltersDTO } from '../../dtos/IFiltersDTO'
import { IStationViewRepository } from '../../repositories/IStationViewRepository'

@injectable()
class CountStationsByResponsibleService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute(filters: IFiltersDTO) {
    const stationsCount =
      await this.stationViewRepository.countStationsByResponsible(filters)

    const total = stationsCount
      .map((value) => value.count)
      .reduce((total, count) => total + count, 0)

    return {
      values: stationsCount,
      total: total,
    }
  }
}

export { CountStationsByResponsibleService }
