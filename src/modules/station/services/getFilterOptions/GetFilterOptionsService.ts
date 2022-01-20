import { IGetFilterOptionsDTO } from '@modules/station/dtos/IGetFilterOptionsDTO'
import { IStationViewRepository } from '@modules/station/repositories/IStationViewRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetFilterOptionsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute(filterTerm: string): Promise<IGetFilterOptionsDTO[]> {
    const countries = await this.stationViewRepository.findFilterOptions(
      'country',
      filterTerm
    )

    const rivers = await this.stationViewRepository.findFilterOptions(
      'river',
      filterTerm
    )

    const names = await this.stationViewRepository.findFilterOptions(
      'name',
      filterTerm
    )

    const networks = await this.stationViewRepository.findFilterOptions(
      'network',
      filterTerm
    )

    const responsibles = await this.stationViewRepository.findFilterOptions(
      'responsible',
      filterTerm
    )

    return countries.concat(rivers, names, networks, responsibles)
  }
}
