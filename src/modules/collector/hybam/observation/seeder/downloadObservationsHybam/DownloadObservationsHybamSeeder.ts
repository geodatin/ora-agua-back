import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

import { IStationHybamRepository } from '../../../station/repositories/IStationHybamRepository'
import { IObservationHybamCollectorRepository } from '../../repositories/IObservationHybamCollectorRepository'

interface IObservation {
  stationCode: string
  timestamp: string
  level?: number
  flowRate?: number
  temperature?: number
  electricConductivity?: number
  ph?: number
  totalOrtophosphate?: number
}

@injectable()
class DownloadObservationsHybamSeeder {
  constructor(
    @inject('ObservationHybamCollectorRepository')
    private ObservationHybamCollectorRepository: IObservationHybamCollectorRepository,

    @inject('StationHybamRepository')
    private stationHybamRepository: IStationHybamRepository
  ) {}

  async execute(): Promise<void> {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'tmp',
      `observation_hybam.csv`
    )
    const observationWriteStream = fs.createWriteStream(filePath, {
      encoding: 'utf8',
    })
    const header =
      'station_code,timestamp,level,flow_rate,temperature,electric_conductivity,ph,total_ortophosphate'
    observationWriteStream.write(header + '\n')

    const stations = await this.stationHybamRepository.getStationsType()

    for (const { code: stationCode, type: stationType } of stations) {
      const observationsMap = new Map<number, IObservation>()

      const [
        { dailyLevels },
        { dailyFlowRate },
        { ph, temperature, conductivity },
        { ortophosphate },
      ] = await Promise.all([
        this.fetchLevels(stationCode),
        this.fetchFlowRate(stationCode),
        this.fetchPhysicalChemistryData(stationCode),
        this.fetchOrtophosphate(stationCode),
      ])

      if (dailyLevels) {
        for (let [timestamp, level] of dailyLevels) {
          if (level !== null) {
            if (stationType === 'altimetric') {
              level = level * 100 // Convert m to cm
            }
            if (observationsMap.has(timestamp)) {
              const observation = observationsMap.get(timestamp)
              observation.level = level
              observationsMap.set(timestamp, observation)
            } else {
              const observation: IObservation = {
                stationCode,
                timestamp: new Date(timestamp).toISOString(),
                level,
              }
              observationsMap.set(timestamp, observation)
            }
          }
        }
      }

      if (dailyFlowRate) {
        for (const [timestamp, flowRate] of dailyFlowRate) {
          if (flowRate !== null) {
            if (observationsMap.has(timestamp)) {
              const observation = observationsMap.get(timestamp)
              observation.flowRate = flowRate
              observationsMap.set(timestamp, observation)
            } else {
              const observation: IObservation = {
                stationCode,
                timestamp: new Date(timestamp).toISOString(),
                flowRate,
              }
              observationsMap.set(timestamp, observation)
            }
          }
        }
      }

      if (ph) {
        for (const [timestamp, value] of ph) {
          if (value !== null) {
            if (observationsMap.has(timestamp)) {
              const observation = observationsMap.get(timestamp)
              observation.ph = value
              observationsMap.set(timestamp, observation)
            } else {
              const observation: IObservation = {
                stationCode,
                timestamp: new Date(timestamp).toISOString(),
                ph: value,
              }
              observationsMap.set(timestamp, observation)
            }
          }
        }
      }

      if (temperature) {
        for (const [timestamp, value] of temperature) {
          if (value !== null) {
            if (observationsMap.has(timestamp)) {
              const observation = observationsMap.get(timestamp)
              observation.temperature = value
              observationsMap.set(timestamp, observation)
            } else {
              const observation: IObservation = {
                stationCode,
                timestamp: new Date(timestamp).toISOString(),
                temperature: value,
              }
              observationsMap.set(timestamp, observation)
            }
          }
        }
      }

      if (conductivity) {
        for (const [timestamp, value] of conductivity) {
          if (value !== null) {
            if (observationsMap.has(timestamp)) {
              const observation = observationsMap.get(timestamp)
              observation.electricConductivity = value
              observationsMap.set(timestamp, observation)
            } else {
              const observation: IObservation = {
                stationCode,
                timestamp: new Date(timestamp).toISOString(),
                electricConductivity: value,
              }
              observationsMap.set(timestamp, observation)
            }
          }
        }
      }

      if (ortophosphate) {
        for (const [timestamp, value] of ortophosphate) {
          if (value !== null) {
            if (observationsMap.has(timestamp)) {
              const observation = observationsMap.get(timestamp)
              observation.totalOrtophosphate = value
              observationsMap.set(timestamp, observation)
            } else {
              const observation: IObservation = {
                stationCode,
                timestamp: new Date(timestamp).toISOString(),
                totalOrtophosphate: value,
              }
              observationsMap.set(timestamp, observation)
            }
          }
        }
      }

      const observations = Array.from(observationsMap.values())
      observations.forEach(
        ({
          stationCode,
          timestamp,
          level,
          flowRate,
          temperature,
          electricConductivity,
          ph,
          totalOrtophosphate,
        }) => {
          observationWriteStream.write(
            `${stationCode},${timestamp},${level ?? ''},${flowRate ?? ''},${
              temperature ?? ''
            },${electricConductivity ?? ''},${ph ?? ''},${
              totalOrtophosphate ?? ''
            }\n`
          )
        }
      )
    }

    await this.ObservationHybamCollectorRepository.deleteAll()
    await this.ObservationHybamCollectorRepository.insertFromCSV(
      filePath,
      header
    )
    // fs.unlinkSync(filePath)
  }

  private async fetchLevels(stationCode: string) {
    let resp = await axios.get(
      `http://hybam.omp.obs-mip.fr:8080/hybamvisu-web/faces/Display.xhtml?stati=${stationCode}&login=iagomachado&langue=pt_BR&data_types=0-1_0-2&ref=1&newchart=yes&site=1`
    )
    const $ = cheerio.load(resp.data)
    let url = $('script[charset="UTF-8"]').first().attr('src')
    resp = await axios.get(url)
    url = String(resp.data).match(/http.*json/g)[0]
    resp = await axios.get(url)
    return {
      dailyLevels: resp.data.averages_0,
      monthlyLevels: resp.data.averages_1,
    }
  }

  private async fetchPhysicalChemistryData(stationCode: string) {
    let resp = await axios.get(
      `http://hybam.omp.obs-mip.fr:8080/hybamvisu-web/faces/Display.xhtml?stati=${stationCode}&ref=1&login=iagomachado&langue=pt_BR&data_types=1-0_1-1_1-2&ref=1&newchart=yes&site=1`
    )
    const $ = cheerio.load(resp.data)
    let url = $('script[charset="UTF-8"]').first().attr('src')
    resp = await axios.get(url)
    url = String(resp.data).match(/http.*json/g)[0]
    resp = await axios.get(url)
    const data = {
      temperature: null,
      conductivity: null,
      ph: null,
    }
    const dataSize = (Object.keys(resp.data).length - 1) / 2
    for (let i = 0; i < dataSize; i++) {
      const name = resp.data[`name_${i}`]
      if (name?.startsWith('pH')) {
        data.ph = resp.data[`averages_${i}`]
      } else if (name?.startsWith('Temperature')) {
        data.temperature = resp.data[`averages_${i}`]
      } else if (name?.startsWith('Conductivity')) {
        data.conductivity = resp.data[`averages_${i}`]
      }
    }
    return data
  }

  private async fetchFlowRate(stationCode: string) {
    let resp = await axios.get(
      `http://hybam.omp.obs-mip.fr:8080/hybamvisu-web/faces/Display.xhtml?stati=${stationCode}&login=iagomachado&langue=pt_BR&data_types=0-4_0-5&ref=1&newchart=yes&site=1`
    )
    const $ = cheerio.load(resp.data)
    let url = $('script[charset="UTF-8"]').first().attr('src')
    resp = await axios.get(url)
    url = String(resp.data).match(/http.*json/g)[0]
    resp = await axios.get(url)
    return {
      dailyFlowRate: resp.data.averages_0,
      monthlyFlowRate: resp.data.averages_1,
    }
  }

  private async fetchOrtophosphate(stationCode: string) {
    let resp = await axios.get(
      `http://hybam.omp.obs-mip.fr:8080/hybamvisu-web/faces/Display.xhtml?stati=${stationCode}&ref=1&login=iagomachado&langue=pt_BR&data_types=4-14&ref=1&newchart=yes&site=1`
    )
    const $ = cheerio.load(resp.data)
    let url = $('script[charset="UTF-8"]').first().attr('src')
    resp = await axios.get(url)
    url = String(resp.data).match(/http.*json/g)[0]
    resp = await axios.get(url)

    return {
      ortophosphate: resp.data?.averages_0,
    }
  }
}

export { DownloadObservationsHybamSeeder }
