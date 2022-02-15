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
    let observations = null
    if (dataType === 'raw') {
      observations = await this.observationRhaViewRepository.timeSeriesRaw(
        stationCode,
        frequency
      )
    } else {
      observations = await this.observationRhaViewRepository.timeSeries(
        stationCode,
        frequency,
        dataType
      )
    }

    if (format === 'csv') {
      const csvValues = observations.map((o) => {
        if (dataType !== 'raw') {
          return {
            date: o.x,
            value: o.y,
          }
        } else {
          return {
            date: o.x,
            rain: o.rain,
            level: o.adoptedLevel,
            flowRate: o.flowRate,
          }
        }
      })

      return json2csv.parse(csvValues)
    }

    if (dataType === 'raw') {
      const response: ITimeSeriesDTO = {
        x: [],
        rain: [],
        adoptedLevel: [],
        flowRate: [],
      }

      observations.forEach((observation) => {
        response.x.push(observation.x.toISOString())
        response.rain.push(observation.rain)
        response.adoptedLevel.push(observation.adoptedLevel)
        response.flowRate.push(observation.flowRate)
      })

      return response
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
