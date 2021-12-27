import { ICreateObservationIdeamDTO } from '@modules/observation/dtos/ICreateObservationIdeamDTO'
import { IObservationIdeamRepository } from '@modules/observation/repositories/IObservationIdeamRepository'
import { StationIdeam } from '@modules/station/models/StationIdeam'
import { IStationIdeamRepository } from '@modules/station/repositories/IStationIdeamRepository'
import { avoidNull } from '@utils/avoidNull'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

@injectable()
class DownloadObservationIdeamSeeder {
  constructor(
    @inject('ObservationIdeamRepository')
    private observationIdeamRepository: IObservationIdeamRepository,

    @inject('StationIdeamRepository')
    private stationIdeamRepository: IStationIdeamRepository
  ) {}

  async execute(): Promise<void> {
    const stations = await this.stationIdeamRepository.getStations()
    console.log('Downloading data from ideam...')
    const observations = await this.fetchData(stations)
    if (observations.length > 0) {
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'tmp',
        `observation_ideam.csv`
      )
      const writeStream = fs.createWriteStream(filePath, {
        encoding: 'utf8',
      })
      const header = 'station_code,timestamp,level_m,flow_rate_mcs,rain_mm_d'
      writeStream.write(header + '\n')

      for (const {
        stationCode,
        timestamp,
        level,
        flowRate,
        rain,
      } of observations) {
        writeStream.write(
          `${stationCode},${timestamp},${avoidNull(level)},${avoidNull(
            flowRate
          )},${avoidNull(rain)}\n`
        )
      }
      console.log(`Inserting ${observations.length} new observations...`)
      await this.observationIdeamRepository.insertFromCSV(filePath, header)
      console.log('Insertions finished.')
      fs.unlinkSync(filePath)
    } else {
      console.log('No new observations.')
    }
  }

  async fetchData(
    stations: StationIdeam[]
  ): Promise<ICreateObservationIdeamDTO[]> {
    let observations: ICreateObservationIdeamDTO[] = []
    for (const { code } of stations) {
      const lastObservation =
        await this.observationIdeamRepository.getLastObservation(code)

      const map = new Map<string, ICreateObservationIdeamDTO>()

      const url = `http://fews.ideam.gov.co/colombia/jsonH/${code}Hobs.json`

      const { data } = await axios.get(url)

      const levelArray = data.obs.data

      for (const [timestamp, level] of levelArray) {
        const date = new Date(timestamp)
        if (!lastObservation || date > lastObservation) {
          const observation: ICreateObservationIdeamDTO = {
            stationCode: code,
            timestamp,
            level,
          }
          map.set(timestamp, observation)
        }
      }

      const rainArray = data.prec.data

      for (const [timestamp, rain] of rainArray) {
        const date = new Date(timestamp)
        if (!lastObservation || date > lastObservation) {
          if (map.has(timestamp)) {
            const observation = map.get(timestamp)
            observation.rain = rain
            map.set(timestamp, observation)
          } else {
            const observation: ICreateObservationIdeamDTO = {
              stationCode: code,
              timestamp,
              rain,
            }
            map.set(timestamp, observation)
          }
        }
      }

      const flowRateUrl = `http://fews.ideam.gov.co/colombia/jsonQ/${code}Qobs.json`

      const { data: flowRateData } = await axios.get(flowRateUrl)

      const flowRateArray = flowRateData.obs.data

      for (const [timestamp, flowRate] of flowRateArray) {
        const date = new Date(timestamp)
        if (!lastObservation || date > lastObservation) {
          if (map.has(timestamp)) {
            const observation = map.get(timestamp)
            observation.flowRate = flowRate
            map.set(timestamp, observation)
          } else {
            const observation: ICreateObservationIdeamDTO = {
              stationCode: code,
              timestamp,
              flowRate,
            }
            map.set(timestamp, observation)
          }
        }
      }
      observations = observations.concat(Array.from(map.values()))
    }

    return observations.filter(
      (observation) =>
        observation.flowRate || observation.level || observation.rain
    )
  }
}

export { DownloadObservationIdeamSeeder }
