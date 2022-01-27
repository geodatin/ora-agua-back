import { ITimeSeriesDTO } from '@modules/observation/dtos/ITimeSeriesDTO'
import { IObservationRepository } from '@modules/observation/repositories/IObservationRepository'
import { FrequencyType } from '@modules/observation/types/FrequencyType'
import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'
import { inject, injectable } from 'tsyringe'

@injectable()
class TimeSeriesService {
  constructor(
    @inject('ObservationRepository')
    private observationRepository: IObservationRepository
  ) {}

  async execute(
    stationCode: number,
    dataType: string,
    frequency: FrequencyType,
    filters: IFiltersDTO
  ): Promise<ITimeSeriesDTO> {
    const observations =
      await this.observationRepository.getStationObservations(
        stationCode,
        dataType,
        frequency
      )
    const response: ITimeSeriesDTO = {
      x: [],
      y: [],
    }

    observations.forEach((observation) => {
      response.x.push(observation.x.toISOString().substring(0, 10))
      response.y.push(observation.y)
    })

    return response
  }
}

export { TimeSeriesService }
