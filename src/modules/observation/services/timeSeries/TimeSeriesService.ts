import { ITimeSeriesDTO } from '@modules/observation/dtos/ITimeSeriesDTO'
import { IObservationRhaViewRepository } from '@modules/observation/repositories/IObservationRhaViewRepository'
import { FrequencyType } from '@modules/observation/types/FrequencyType'
import json2csv from 'json2csv'
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
    frequency: FrequencyType,
    format?: string
  ): Promise<ITimeSeriesDTO | string> {
    const observations = await this.observationRhaViewRepository.timeSeries(
      stationCode,
      frequency,
      dataType
    )

    if (format === 'csv') {
      const csvValues = observations.map((o) => {
        return {
          date: o.x,
          value: o.y,
        }
      })

      return json2csv.parse(csvValues)
    }

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
