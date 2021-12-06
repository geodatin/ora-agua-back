import { IDailyWaterLevelHybamRepository } from '@modules/observation/repositories/IDailyWaterLevelHybamRepository'
import { IMonthlyWaterLevelHybamRepository } from '@modules/observation/repositories/IMonthlyWaterLevelHybamRepository'
import { IStationHybamRepository } from '@modules/station/repositories/IStationHybamRepository'
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

@injectable()
class DownloadWaterLevelsHybamSeeder {
  constructor(
    @inject('DailyWaterLevelHybamRepository')
    private dailyWaterLevelHybamRepository: IDailyWaterLevelHybamRepository,

    @inject('MonthlyWaterLevelHybamRepository')
    private monthlyWaterLevelHybamRepository: IMonthlyWaterLevelHybamRepository,

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
      'tmp',
      `monthly_water_level_hybam.csv`
    )
    const monthlyWriteStream = fs.createWriteStream(monthlyFilePath, {
      encoding: 'utf8',
    })
    monthlyWriteStream.write(header + '\n')

    const stations = await this.stationHybamRepository.getStationsType()

    for (const { code, type } of stations) {
      const { dailyLevels, monthlyLevels } = await this.fetchWaterLevels(code)

      if (dailyLevels) {
        for (let [timestamp, level] of dailyLevels) {
          if (level !== null) {
            const date = new Date(timestamp).toISOString()
            if (type === 'altimetric') {
              level = level * 100 // Convert m to cm
            }
            dailyWriteStream.write(`${code},${date},${level}\n`)
          }
        }
      }

      if (monthlyLevels) {
        for (let [timestamp, level] of monthlyLevels) {
          if (level !== null) {
            const date = new Date(timestamp).toISOString()
            if (type === 'altimetric') {
              level = level * 100 // Convert m to cm
            }
            monthlyWriteStream.write(`${code},${date},${level}\n`)
          }
        }
      }
    }

    console.log('Deleting values from hybam daily levels table...')
    await this.dailyWaterLevelHybamRepository.deleteAll()

    console.log('Inserting hybam daily levels...')
    await this.dailyWaterLevelHybamRepository.insertFromCSV(
      dailyFilePath,
      header
    )
    console.log('Hybam daily levels insertion finished.')

    console.log('Deleting values from hybam monthly levels table...')
    await this.monthlyWaterLevelHybamRepository.deleteAll()

    console.log('Inserting hybam monthly levels...')
    await this.monthlyWaterLevelHybamRepository.insertFromCSV(
      monthlyFilePath,
      header
    )
    console.log('Hybam monthly levels insertion finished.')
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
