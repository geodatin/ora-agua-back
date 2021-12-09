import { IObservationHybamRepository } from '@modules/observation/repositories/IObservationHybamRepository'
import { IStationHybamRepository } from '@modules/station/repositories/IStationHybamRepository'
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

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

    for (const { code } of stations) {
      const { dailyDischarges, monthlyDischarges } = await this.fetchDischarges(
        code
      )

      if (dailyDischarges) {
        for (const [timestamp, level] of dailyDischarges) {
          if (level !== null) {
            const date = new Date(timestamp).toISOString()
            dailyWriteStream.write(`${code},${date},${level}\n`)
          }
        }
      }

      if (monthlyDischarges) {
        for (const [timestamp, level] of monthlyDischarges) {
          if (level !== null) {
            const date = new Date(timestamp).toISOString()
            monthlyWriteStream.write(`${code},${date},${level}\n`)
          }
        }
      }
    }

    console.log('Deleting values from hybam daily discharges table...')
    await this.dailyDischargeHybamRepository.deleteAll()

    console.log('Inserting hybam daily discharges...')
    await this.dailyDischargeHybamRepository.insertFromCSV(
      dailyFilePath,
      header
    )
    console.log('Hybam daily discharges insertion finished.')

    console.log('Deleting values from hybam monthly discharges table...')
    await this.monthlyDischargeHybamRepository.deleteAll()

    console.log('Inserting hybam monthly discharges...')
    await this.monthlyDischargeHybamRepository.insertFromCSV(
      monthlyFilePath,
      header
    )
    console.log('Hybam monthly discharges insertion finished.')
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
