import { IGetFilterOptionsDTO } from '@modules/station/dtos/IGetFilterOptionsDTO'
import { IStationViewRepository } from '@modules/station/repositories/IStationViewRepository'
import { variables } from '@utils/variables'
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

    const responsibles = await this.stationViewRepository.findFilterOptions(
      'responsible',
      filterTerm
    )

    const variables = await this.getVariables(filterTerm)

    return countries.concat(rivers, names, responsibles, variables)
  }

  async getVariables(filterTerm: string): Promise<IGetFilterOptionsDTO[]> {
    const expression = new RegExp(`^${filterTerm}.*`)

    const filtered = variables.filter((variable) =>
      variable.value.match(expression)
    )

    return filtered
  }
}
