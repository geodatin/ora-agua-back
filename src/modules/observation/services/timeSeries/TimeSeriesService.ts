import { ITimeSeriesDTO } from '@modules/observation/dtos/ITimeSeriesDTO'
import { IObservationRhaViewRepository } from '@modules/observation/repositories/IObservationRhaViewRepository'
import { FrequencyType } from '@modules/observation/types/FrequencyType'
import { inject, injectable } from 'tsyringe'

@injectable()
class TimeSeriesService {
  constructor(
    @inject('ObservationRhaViewRepository')
    private observationRhaViewRepository: IObservationRhaViewRepository
  ) {}

  async execute(
    stationCode: string,
    dataType: string,
    frequency: FrequencyType
  ): Promise<ITimeSeriesDTO> {
    const observations = await this.observationRhaViewRepository.timeSeries(
      stationCode,
      frequency,
      dataType
    )
    const response: ITimeSeriesDTO = {
      x: [],
      y: [],
    }

    observations.forEach((observation) => {
      response.x.push(observation.x.toISOString())
      response.y.push(observation.y)
    })

    return response
  }
}

export { TimeSeriesService }
