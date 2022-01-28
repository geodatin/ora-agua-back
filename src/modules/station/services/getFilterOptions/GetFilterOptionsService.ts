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

    const responsibles = await this.stationViewRepository.findFilterOptions(
      'responsible',
      filterTerm
    )

    const variables = await this.getVariables(filterTerm)

    return countries.concat(rivers, names, responsibles, variables)
  }

  async getVariables(filterTerm: string): Promise<IGetFilterOptionsDTO[]> {
    const variables = [
      {
        value: 'ph',
        type: 'variable',
      },
      {
        value: 'OD',
        type: 'variable',
      },
      {
        value: 'electricConductivity',
        type: 'variable',
      },
      {
        value: 'turbidity',
        type: 'variable',
      },
      {
        value: 'sampleTemperature',
        type: 'variable',
      },
      {
        value: 'totalDissolvedSolid',
        type: 'variable',
      },
      {
        value: 'totalNitrogen',
        type: 'variable',
      },
      {
        value: 'totalOrtophosphate',
        type: 'variable',
      },
      {
        value: 'totalSuspensionSolid',
        type: 'variable',
      },
      {
        value: 'rain',
        type: 'variable',
      },
      {
        value: 'flowRate',
        type: 'variable',
      },
      {
        value: 'adoptedLevel',
        type: 'variable',
      },
    ]

    const expression = new RegExp(`^${filterTerm}.*`)

    const filtered = variables.filter((variable) =>
      variable.value.match(expression)
    )

    return filtered
  }
}
