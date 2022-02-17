import { variables } from '@utils/variables'
import { inject, injectable } from 'tsyringe'

import { IGetFilterOptionsDTO } from '../../dtos/IGetFilterOptionsDTO'
import { IStationViewRepository } from '../../repositories/IStationViewRepository'

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

    const responsibles = await this.stationViewRepository.findFilterOptions(
      'responsible',
      filterTerm
    )

    const variables = await this.getVariables(filterTerm)

    return countries.concat(rivers, names, responsibles, variables)
  }

  async getVariables(filterTerm: string): Promise<IGetFilterOptionsDTO[]> {
    const expression = new RegExp(`^${filterTerm.toLowerCase()}.*`)

    const filtered = variables.filter(
      (variable) =>
        variable.nameEN.toLowerCase().match(expression) ||
        variable.nameES.toLowerCase().match(expression) ||
        variable.namePT.toLowerCase().match(expression)
    )

    return filtered
  }
}
