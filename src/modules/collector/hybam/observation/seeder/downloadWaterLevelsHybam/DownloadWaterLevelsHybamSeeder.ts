import { IStationHybamRepository } from '@modules/collector/hybam/station/repositories/IStationHybamRepository'
import { log } from '@utils/log'
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

import { IObservationHybamCollectorRepository } from '../../repositories/IObservationHybamCollectorRepository'

@injectable()
class DownloadWaterLevelsHybamSeeder {
  constructor(
    @inject('DailyWaterLevelHybamRepository')
    private dailyWaterLevelHybamRepository: IObservationHybamCollectorRepository,

    @inject('MonthlyWaterLevelHybamRepository')
    private monthlyWaterLevelHybamRepository: IObservationHybamCollectorRepository,

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
      '..',
      '..',
      'tmp',
      `daily_water_level_hybam.csv`
    )
    const dailyWriteStream = fs.createWriteStream(dailyFilePath, {
      encoding: 'utf8',
    })
    const header = 'station_code,timestamp,quota_cm'
    dailyWriteStream.write(header + '\n')

    const monthlyFilePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'tmp',
      `monthly_water_level_hybam.csv`
    )
    const monthlyWriteStream = fs.createWriteStream(monthlyFilePath, {
      encoding: 'utf8',
    })
    monthlyWriteStream.write(header + '\n')

    const stations = await this.stationHybamRepository.getStationsType()

    const dailyLastObservations =
      await this.dailyWaterLevelHybamRepository.getLastObservation()

    const monthlyLastObservations =
      await this.monthlyWaterLevelHybamRepository.getLastObservation()

    let dailyCount = 0
    let monthlyCount = 0

    log('Downloading hybam water level data...')
    for (const { code, type } of stations) {
      const { dailyLevels, monthlyLevels } = await this.fetchWaterLevels(code)

      const dailyLastObservation = dailyLastObservations.find(
        (element) => element.code === code
      )
      const dailyLastObservationDate = dailyLastObservation?.date

      if (dailyLevels) {
        for (let [timestamp, level] of dailyLevels) {
          if (level !== null) {
            const date = new Date(timestamp)
            if (!dailyLastObservationDate || date > dailyLastObservationDate) {
              if (type === 'altimetric') {
                level = level * 100 // Convert m to cm
              }
              dailyCount++
              dailyWriteStream.write(`${code},${date.toISOString()},${level}\n`)
            }
          }
        }
      }

      const monthlyLastObservation = monthlyLastObservations.find(
        (element) => element.code === code
      )
      const monthlyLastObservationDate = monthlyLastObservation?.date

      if (monthlyLevels) {
        for (let [timestamp, level] of monthlyLevels) {
          if (level !== null) {
            const date = new Date(timestamp)
            if (
              !monthlyLastObservationDate ||
              date > monthlyLastObservationDate
            ) {
              if (type === 'altimetric') {
                level = level * 100 // Convert m to cm
              }
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
      log('Inserting hybam daily levels...')
      await this.dailyWaterLevelHybamRepository.insertFromCSV(
        dailyFilePath,
        header
      )
      log('Hybam daily levels insertion finished.')
    } else {
      log('No new daily levels data.')
    }

    if (monthlyCount > 0) {
      log('Inserting hybam monthly levels...')
      await this.monthlyWaterLevelHybamRepository.insertFromCSV(
        monthlyFilePath,
        header
      )
      log('Hybam monthly levels insertion finished.')
    } else {
      log('No new monthly levels data.')
    }

    fs.unlinkSync(dailyFilePath)
    fs.unlinkSync(monthlyFilePath)
  }

  private async fetchWaterLevels(stationCode: string) {
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
}

export { DownloadWaterLevelsHybamSeeder }
