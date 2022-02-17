import { IStationHybamRepository } from '@modules/collector/hybam/station/repositories/IStationHybamRepository'
import { log } from '@utils/log'
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

import { IObservationHybamRepository } from '../../repositories/IObservationHybamRepository'

@injectable()
class DownloadDischargesHybamSeeder {
  constructor(
    @inject('DailyDischargeHybamRepository')
    private dailyDischargeHybamRepository: IObservationHybamRepository,

    @inject('MonthlyDischargeHybamRepository')
    private monthlyDischargeHybamRepository: IObservationHybamRepository,

    @inject('StationHybamRepository')
    private stationHybamRepository: IStationHybamRepository
  ) {}

  async execute(): Promise<void> {
    const dailyFilePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'tmp',
      `daily_discharge_hybam.csv`
    )
    const dailyWriteStream = fs.createWriteStream(dailyFilePath, {
      encoding: 'utf8',
    })
    const header = 'station_code,timestamp,discharge_m3_s'
    dailyWriteStream.write(header + '\n')

    const monthlyFilePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'tmp',
      `monthly_discharge_hybam.csv`
    )
    const monthlyWriteStream = fs.createWriteStream(monthlyFilePath, {
      encoding: 'utf8',
    })
    monthlyWriteStream.write(header + '\n')

    const stations = await this.stationHybamRepository.getStationsType()
    const dailyLastObservations =
      await this.dailyDischargeHybamRepository.getLastObservation()
    const monthlyLastObservations =
      await this.monthlyDischargeHybamRepository.getLastObservation()

    let monthlyCount = 0
    let dailyCount = 0

    log('Downloading hybam discharges data...')
    for (const { code } of stations) {
      const lastStationDailyObservation = dailyLastObservations.find(
        (element) => element.code === code
      )
      const lastDailyObservation = lastStationDailyObservation?.date

      const lastStationMonthlyObservation = monthlyLastObservations.find(
        (element) => element.code === code
      )
      const lastMonthlyObservation = lastStationMonthlyObservation?.date

      const { dailyDischarges, monthlyDischarges } = await this.fetchDischarges(
        code
      )

      if (dailyDischarges) {
        for (const [timestamp, level] of dailyDischarges) {
          if (level !== null) {
            const date = new Date(timestamp)
            if (!lastDailyObservation || date > lastDailyObservation) {
              dailyCount++
              dailyWriteStream.write(`${code},${date.toISOString()},${level}\n`)
            }
          }
        }
      }

      if (monthlyDischarges) {
        for (const [timestamp, level] of monthlyDischarges) {
          if (level !== null) {
            const date = new Date(timestamp)
            if (!lastMonthlyObservation || date > lastMonthlyObservation) {
              monthlyCount++
              monthlyWriteStream.write(
                `${code},${date.toISOString()},${level}\n`
              )
            }
          }
        }
      }
    }

    if (dailyCount > 0) {
      log('Inserting hybam daily discharges...')
      await this.dailyDischargeHybamRepository.insertFromCSV(
        dailyFilePath,
        header
      )
      log('Hybam daily discharges insertion finished.')
    } else {
      log('No new daily discharges.')
    }

    if (monthlyCount > 0) {
      log('Inserting hybam monthly discharges...')
      await this.monthlyDischargeHybamRepository.insertFromCSV(
        monthlyFilePath,
        header
      )
      log('Hybam monthly discharges insertion finished.')
    } else {
      log('No new monthly discharges.')
    }

    fs.unlinkSync(dailyFilePath)
    fs.unlinkSync(monthlyFilePath)
  }

  private async fetchDischarges(stationCode: string) {
    let resp = await axios.get(
      `http://hybam.omp.obs-mip.fr:8080/hybamvisu-web/faces/Display.xhtml?stati=${stationCode}&login=iagomachado&langue=pt_BR&data_types=0-4_0-5&ref=1&newchart=yes&site=1`
    )
    const $ = cheerio.load(resp.data)
    let url = $('script[charset="UTF-8"]').first().attr('src')
    resp = await axios.get(url)
    url = String(resp.data).match(/http.*json/g)[0]
    resp = await axios.get(url)
    return {
      dailyDischarges: resp.data.averages_0,
      monthlyDischarges: resp.data.averages_1,
    }
  }
}

export { DownloadDischargesHybamSeeder }
