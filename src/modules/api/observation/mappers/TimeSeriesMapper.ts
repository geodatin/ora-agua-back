import json2csv from 'json2csv'

import { ITimeSeriesDTO, ITimeSeriesEntryDTO } from '../dtos/ITimeSeriesDTO'
import {
  ITimeSeriesHybamDTO,
  ITimeSeriesHybamEntryDTO,
} from '../dtos/ITimeSeriesHybamDTO'
import {
  ITimeSeriesRqaDTO,
  ITimeSeriesRqaEntryDTO,
} from '../dtos/ITimeSeriesRqaDTO'
import { NetworkTypeError } from '../errors/NetworkTypeError'

export class TimeSeriesMapper {
  static toDTO(
    entries:
      | ITimeSeriesEntryDTO[]
      | ITimeSeriesRqaEntryDTO[]
      | ITimeSeriesHybamEntryDTO[],
    dataType: string,
    network: string,
    limits?:
      | { superiorLimit: number; inferiorLimit: number }
      | {
          rainSuperiorLimit: number
          rainInferiorLimit: number
          flowRateSuperiorLimit: number
          flowRateInferiorLimit: number
        }
  ): ITimeSeriesDTO | ITimeSeriesRqaDTO | ITimeSeriesHybamDTO {
    if (dataType === 'raw') {
      if (network === 'rha') {
        const response: ITimeSeriesDTO = {
          x: [],
          rain: [],
          level: [],
          flowRate: [],
        }

        entries.forEach((entry: ITimeSeriesEntryDTO) => {
          response.x.push(entry.x.toISOString())
          response.rain.push(entry.rain)
          response.level.push(entry.level)
          response.flowRate.push(entry.flowRate)
        })

        response.limits = limits

        return response
      } else if (network === 'rqa') {
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

        entries.forEach((entry: ITimeSeriesRqaEntryDTO) => {
          response.x.push(entry.x.toISOString())
          response.ph.push(entry.ph)
          response.OD.push(entry.OD)
          response.electricConductivity.push(entry.electricConductivity)
          response.turbidity.push(entry.turbidity)
          response.sampleTemperature.push(entry.sampleTemperature)
          response.totalDissolvedSolid.push(entry.totalDissolvedSolid)
          response.totalNitrogen.push(entry.totalNitrogen)
          response.totalOrtophosphate.push(entry.totalOrtophosphate)
          response.totalSuspensionSolid.push(entry.totalSuspensionSolid)
        })

        return response
      } else if (network === 'hybam') {
        const response: ITimeSeriesHybamDTO = {
          x: [],
          ph: [],
          electricConductivity: [],
          sampleTemperature: [],
          totalOrtophosphate: [],
          flowRate: [],
          level: [],
        }

        entries.forEach((entry: ITimeSeriesHybamEntryDTO) => {
          response.x.push(entry.x.toISOString())
          response.ph.push(entry.ph)
          response.electricConductivity.push(entry.electricConductivity)
          response.sampleTemperature.push(entry.sampleTemperature)
          response.totalOrtophosphate.push(entry.totalOrtophosphate)
          response.flowRate.push(entry.flowRate)
          response.level.push(entry.level)
        })

        return response
      } else {
        throw new NetworkTypeError()
      }
    }

    const response: ITimeSeriesDTO = {
      x: [],
      y: [],
    }

    entries.forEach((entry: ITimeSeriesEntryDTO) => {
      response.x.push(entry.x.toISOString())
      response.y.push(entry.y)
    })

    if (dataType !== 'rain') {
      response.limits = limits
    }

    return response
  }

  static toCSV(
    entries:
      | ITimeSeriesEntryDTO[]
      | ITimeSeriesRqaEntryDTO[]
      | ITimeSeriesHybamEntryDTO[],
    dataType: string,
    network: string
  ): string {
    const csvValues = entries.map((entry) => {
      if (dataType !== 'raw') {
        return {
          date: entry.x,
          value: entry.y,
        }
      } else {
        if (network === 'rha') {
          return {
            date: entry.x,
            rain: entry.rain,
            level: entry.level,
            flowRate: entry.flowRate,
          }
        } else if (network === 'rqa') {
          return {
            date: entry.x,
            ph: entry.ph,
            OD: entry.OD,
            electricConductivity: entry.electricConductivity,
            turbidity: entry.turbidity,
            sampleTemperature: entry.sampleTemperature,
            totalDissolvedSolid: entry.totalDissolvedSolid,
            totalNitrogen: entry.totalNitrogen,
            totalOrtophosphate: entry.totalOrtophosphate,
            totalSuspensionSolid: entry.totalSuspensionSolid,
          }
        } else if (network === 'hybam') {
          return {
            date: entry.x,
            ph: entry.ph,
            electricConductivity: entry.electricConductivity,
            sampleTemperature: entry.sampleTemperature,
            totalOrtophosphate: entry.totalOrtophosphate,
            level: entry.level,
            flowRate: entry.flowRate,
          }
        } else {
          throw new NetworkTypeError()
        }
      }
    })

    return json2csv.parse(csvValues)
  }
}
