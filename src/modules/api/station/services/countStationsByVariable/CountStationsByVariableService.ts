import { variables } from '@utils/variables'
import { inject, injectable } from 'tsyringe'

import { IFiltersDTO } from '../../dtos/IFiltersDTO'
import { IStationViewRepository } from '../../repositories/IStationViewRepository'

interface IResponse {
  network: string
  variable: string
  stations: number
}

@injectable()
class CountStationsByVariableService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute(filters: IFiltersDTO): Promise<IResponse[]> {
    const stationsCountByVariable =
      await this.stationViewRepository.countStationsByVariable(filters)

    const response: IResponse[] = []

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
