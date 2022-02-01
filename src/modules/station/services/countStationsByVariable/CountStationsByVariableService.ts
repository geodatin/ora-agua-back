import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'
import { IStationViewRepository } from '@modules/station/repositories/IStationViewRepository'
import { variables } from '@utils/variables'
import { inject, injectable } from 'tsyringe'

@injectable()
class CountStationsByVariableService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute(
    filters: IFiltersDTO
  ): Promise<{ network: string; variable: string; stations: number }[]> {
    const stationsCountByVariable =
      await this.stationViewRepository.countStationsByVariable(filters)

    const response = []

    stationsCountByVariable.forEach((count) => {
      variables.forEach((variable) => {
        response.push({
          network: count.network,
          variable: variable.value,
          stations: count[variable.value],
        })
      })
    })

    return response
  }
}

export { CountStationsByVariableService }
