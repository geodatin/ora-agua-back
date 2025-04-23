import axios from 'axios'
import { log } from 'console'
import { inject, injectable } from 'tsyringe'

import { StationIdeam } from '../../../station/models/StationIdeam'
import { IStationIdeamRepository } from '../../../station/repositories/IStationIdeamRepository'
import { ICreateWaterQualityIdeamDTO } from '../../dtos/ICreateWaterQualityIdeamDTO'
import { IWaterQualityIdeamRepository } from '../../repositories/IWaterQualityIdeamRepository'

const url = {
  totalNitrogen:
    'http://bart.ideam.gov.co/indiecosistemas/ind/json/nitrogeno.json',
  od: 'http://bart.ideam.gov.co/indiecosistemas/ind/json/oxigeno.json',
  totalSuspensionSolid:
    'http://bart.ideam.gov.co/indiecosistemas/ind/json/solidos.json',
}

@injectable()
class DownloadWaterQualityIdeamSeeder {
  constructor(
    @inject('StationIdeamRepository')
    private stationIdeamRepository: IStationIdeamRepository,

    @inject('WaterQualityIdeamRepository')
    private waterQualityIdeamRepository: IWaterQualityIdeamRepository
  ) {}

  async execute(): Promise<void> {
    log('Downloading water quality data from ideam...')
    const nitrogenValues = await this.fetchData(url.totalNitrogen)
    const odValues = await this.fetchData(url.od)
    const suspensionSolidValues = await this.fetchData(url.totalSuspensionSolid)

    const stations = await this.stationIdeamRepository.getStations()

    const map = new Map<string, ICreateWaterQualityIdeamDTO>()

    for (const entity of nitrogenValues) {
      const station = this.findStation(stations, entity.station)
      if (station) {
        for (const { year, value } of entity.data) {
          const key = station.code + String(year)
          map.set(key, {
            stationCode: station.code,
            timestamp: new Date(String(year) + '-01-01').toISOString(),
            totalNitrogen: value,
          })
        }
      }
    }

    for (const entity of odValues) {
      const station = this.findStation(stations, entity.station)
      if (station) {
        for (const { year, value } of entity.data) {
          const key = station.code + String(year)
          if (map.has(key)) {
            const qualityEntry = map.get(key)
            qualityEntry.OD = value
            map.set(key, qualityEntry)
          } else {
            map.set(key, {
              stationCode: station.code,
              timestamp: new Date(String(year) + '-01-01').toISOString(),
              OD: value,
            })
          }
        }
      }
    }

    for (const entity of suspensionSolidValues) {
      const station = this.findStation(stations, entity.station)
      if (station) {
        for (const { year, value } of entity.data) {
          const key = station.code + String(year)
          if (map.has(key)) {
            const qualityEntry = map.get(key)
            qualityEntry.totalSuspensionSolid = value
            map.set(key, qualityEntry)
          } else {
            map.set(key, {
              stationCode: station.code,
              timestamp: new Date(String(year) + '-01-01').toISOString(),
              totalSuspensionSolid: value,
            })
          }
        }
      }
    }

    await this.waterQualityIdeamRepository.createMany(Array.from(map.values()))
    log('Insertion finished.')
  }

  private findStation(
    stations: StationIdeam[],
    stationName: string
  ): StationIdeam | null {
    const stationCode = stationName.split('[')[1]?.split(']')[0]
    if (stationCode) {
      const station = stations.find((s) => s.code.includes(stationCode))
      return station
    }
    return null
  }

  private async fetchData(
    url: string
  ): Promise<
    Array<{ station: string; data: Array<{ year: number; value: number }> }>
  > {
    const { data } = await axios.get(url)

    const values = []

    for (const obj of data) {
      const entity = {
        station: obj.estacion,
        data: [],
      }
      Object.keys(obj).forEach((key) => {
        if (key.startsWith('a')) {
          entity.data.push({
            year: parseInt(key.replace('a', '')),
            value: obj[key],
          })
        }
      })
      values.push(entity)
    }
    return values
  }
}

export { DownloadWaterQualityIdeamSeeder }
