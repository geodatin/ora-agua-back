import json2csv from 'json2csv'
import { inject, injectable } from 'tsyringe'

import { ITimeSeriesDTO, ITimeSeriesEntryDTO } from '../../dtos/ITimeSeriesDTO'
import {
  ITimeSeriesRqaDTO,
  ITimeSeriesRqaEntryDTO,
} from '../../dtos/ITimeSeriesRqaDTO'
import { IObservationRhaViewRepository } from '../../repositories/IObservationRhaViewRepository'
import { IObservationRqaViewRepository } from '../../repositories/IObservationRqaViewRepository'
import { FrequencyType } from '../../types/FrequencyType'

@injectable()
class TimeSeriesService {
  constructor(
    @inject('ObservationRhaViewRepository')
    private observationRhaViewRepository: IObservationRhaViewRepository,

    @inject('ObservationRqaViewRepository')
    private observationRqaViewRepository: IObservationRqaViewRepository
  ) {}

  async execute(
    stationCode: string,
    dataType: string,
    frequency: FrequencyType,
    network: string,
    format?: string
  ): Promise<ITimeSeriesDTO | ITimeSeriesRqaDTO | string> {
    let observations = null
    if (dataType === 'raw') {
      if (network === 'rha') {
        observations = await this.observationRhaViewRepository.timeSeriesRaw(
          stationCode,
          frequency
        )
      } else {
        observations = await this.observationRqaViewRepository.timeSeriesRaw(
          stationCode,
          frequency
        )
      }
    } else {
      if (network === 'rha') {
        observations = await this.observationRhaViewRepository.timeSeries(
          stationCode,
          frequency,
          dataType
        )
      } else {
        observations = await this.observationRqaViewRepository.timeSeries(
          stationCode,
          frequency,
          dataType
        )
      }
    }

    if (format === 'csv') {
      const csvValues = observations.map((o) => {
        if (dataType !== 'raw') {
          return {
            date: o.x,
            value: o.y,
          }
        } else {
          if (network === 'rha') {
            return {
              date: o.x,
              rain: o.rain,
              level: o.adoptedLevel,
              flowRate: o.flowRate,
            }
          } else {
            return {
              date: o.x,
              ph: o.ph,
              OD: o.OD,
              electricConductivity: o.electricConductivity,
              turbidity: o.turbidity,
              sampleTemperature: o.sampleTemperature,
              totalDissolvedSolid: o.totalDissolvedSolid,
              totalNitrogen: o.totalNitrogen,
              totalOrtophosphate: o.totalOrtophosphate,
              totalSuspensionSolid: o.totalSuspensionSolid,
            }
          }
        }
      })

      return json2csv.parse(csvValues)
    }

    if (dataType === 'raw') {
      if (network === 'rha') {
        const response: ITimeSeriesDTO = {
          x: [],
          rain: [],
          adoptedLevel: [],
          flowRate: [],
        }

        observations.forEach((observation: ITimeSeriesEntryDTO) => {
          response.x.push(observation.x.toISOString())
          response.rain.push(observation.rain)
          response.adoptedLevel.push(observation.adoptedLevel)
          response.flowRate.push(observation.flowRate)
        })

        return response
      } else {
        const response: ITimeSeriesRqaDTO = {
          x: [],
          ph: [],
          OD: [],
          electricConductivity: [],
          turbidity: [],
          sampleTemperature: [],
          totalDissolvedSolid: [],
          totalNitrogen: [],
          totalOrtophosphate: [],
          totalSuspensionSolid: [],
        }

        observations.forEach((observation: ITimeSeriesRqaEntryDTO) => {
          response.x.push(observation.x.toISOString())
          response.ph.push(observation.ph)
          response.OD.push(observation.OD)
          response.electricConductivity.push(observation.electricConductivity)
          response.turbidity.push(observation.turbidity)
          response.sampleTemperature.push(observation.sampleTemperature)
          response.totalDissolvedSolid.push(observation.totalDissolvedSolid)
          response.totalNitrogen.push(observation.totalNitrogen)
          response.totalOrtophosphate.push(observation.totalOrtophosphate)
          response.totalSuspensionSolid.push(observation.totalSuspensionSolid)
        })

        return response
      }
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
