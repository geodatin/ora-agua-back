import { ITimeSeriesDTO } from '@modules/observation/dtos/ITimeSeriesDTO'
import { IObservationRepository } from '@modules/observation/repositories/IObservationRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class TimeSeriesService {
  constructor(
    @inject('ObservationRepository')
    private observationRepository: IObservationRepository
  ) {}

  async execute(
    stationCode: number,
    dataType: string
  ): Promise<ITimeSeriesDTO> {
    const observations =
      await this.observationRepository.getStationObservations(
        stationCode,
        dataType
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