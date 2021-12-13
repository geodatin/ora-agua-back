import { IObservationHybamRepository } from '@modules/observation/repositories/IObservationHybamRepository'
import { IStationHybamRepository } from '@modules/station/repositories/IStationHybamRepository'
import { avoidNull } from '@utils/avoidNull'
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

@injectable()
class DownloadPhysicalChemistryHybamSeeder {
  constructor(
    @inject('PhysicalChemistryHybamRepository')
    private physicalChemistryHybamRepository: IObservationHybamRepository,

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
      'tmp',
      `physical_chemistry_hybam.csv`
    )
    const writeStream = fs.createWriteStream(filePath, {
      encoding: 'utf8',
    })
    const header = 'station_code,timestamp,temperature_c,conductivity_us,ph'
    writeStream.write(header + '\n')

    const stations = await this.stationHybamRepository.getStationsType()

    const lastObservations =
      await this.physicalChemistryHybamRepository.getLastObservation()

    let count = 0

    console.log('Downloading hybam physical chemistry data...')
    for (const { code } of stations) {
      const map = new Map()
      const { temperature, conductivity, ph } =
        await this.fetchPhysicalChemistryData(code)

      const lastObservation = lastObservations.find(
        (element) => element.code === code
      )
      const lastObservationDate = lastObservation?.date

      if (temperature) {
        for (const [timestamp, value] of temperature) {
          const date = new Date(timestamp)
          map.set(timestamp, {
            date: date,
            temperature: value,
            conductivity: null,
            ph: null,
          })
        }
      }

      if (conductivity) {
        for (const [timestamp, value] of conductivity) {
          if (map.has(timestamp)) {
            const entry = map.get(timestamp)
            entry.conductivity = value
            map.set(timestamp, entry)
          } else {
            const date = new Date(timestamp)
            map.set(timestamp, {
              date: date,
              conductivity: value,
              temperature: null,
              ph: null,
            })
          }
        }
      }

      if (ph) {
        for (const [timestamp, value] of ph) {
          if (map.has(timestamp)) {
            const entry = map.get(timestamp)
            entry.ph = value
            map.set(timestamp, entry)
          } else {
            const date = new Date(timestamp)
            map.set(timestamp, {
              date: date,
              ph: value,
              temperature: null,
              conductivity: null,
            })
          }
        }
      }

      for (const { date, temperature, conductivity, ph } of map.values()) {
        if (!temperature && !conductivity && !ph) {
          continue
        }
        if (!lastObservationDate || date > lastObservationDate) {
          count++
          writeStream.write(
            // eslint-disable-next-line prettier/prettier
            `${code},${date.toISOString()},${avoidNull(temperature)},${avoidNull(conductivity)},${avoidNull(ph)}\n`
          )
        }
      }
    }

    if (count > 0) {
      console.log('Inserting hybam physical chemistry...')
      await this.physicalChemistryHybamRepository.insertFromCSV(
        filePath,
        header
      )
      console.log('Hybam physical chemistry insertion finished.')
    } else {
      console.log('No new physical chemistry data.')
    }

    fs.unlinkSync(filePath)
  }

  private async fetchPhysicalChemistryData(stationId: string) {
    let resp = await axios.get(
      `http://hybam.omp.obs-mip.fr:8080/hybamvisu-web/faces/Display.xhtml?stati=${stationId}&ref=1&login=iagomachado&langue=pt_BR&data_types=1-0_1-1_1-2&ref=1&newchart=yes&site=1`
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
}

export { DownloadPhysicalChemistryHybamSeeder }
