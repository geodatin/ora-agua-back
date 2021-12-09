import { ISatelliteDerivedSedimentsHybamRepository } from '@modules/observation/repositories/ISatelliteDerivedSedimentsHybamRepository'
import { ISedimentsHybamRepository } from '@modules/observation/repositories/ISedimentsHybamRepository'
import { IStationHybamRepository } from '@modules/station/repositories/IStationHybamRepository'
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

@injectable()
class DownloadSedimentsHybamSeeder {
  constructor(
    @inject('SedimentsHybamRepository')
    private sedimentsHybamRepository: ISedimentsHybamRepository,

    @inject('SatelliteDerivedSedimentsHybamRepository')
    private satelliteDerivedSedimentsHybamRepository: ISatelliteDerivedSedimentsHybamRepository,

    @inject('StationHybamRepository')
    private stationHybamRepository: IStationHybamRepository
  ) {}

  async execute(): Promise<void> {
    const sedimentsFilePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'tmp',
      `sediments_hybam.csv`
    )
    const sedimentsWriteStream = fs.createWriteStream(sedimentsFilePath, {
      encoding: 'utf8',
    })
    const sedimentsHeader = 'station_code,timestamp,concentration_mg_l'
    sedimentsWriteStream.write(sedimentsHeader + '\n')

    const satelliteFilePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'tmp',
      `satellite_derived_sediments_hybam.csv`
    )
    const satelliteWriteStream = fs.createWriteStream(satelliteFilePath, {
      encoding: 'utf8',
    })
    const satelliteHeader =
      'station_code,timestamp,concentration_mg_l,range_concentration_min,range_concentration_max'
    satelliteWriteStream.write(satelliteHeader + '\n')

    const stations = await this.stationHybamRepository.getStationsType()

    console.log('Downloading hybam sediments data...')
    for (const { code } of stations) {
      const { sediments, satelliteRanges, satelliteAvgs } =
        await this.fetchSediments(code)

      if (sediments) {
        for (const [timestamp, value] of sediments) {
          if (value !== null) {
            const date = new Date(timestamp).toISOString()
            sedimentsWriteStream.write(`${code},${date},${value}\n`)
          }
        }
      }

      if (satelliteRanges) {
        let index = 0
        for (const [timestamp, min, max] of satelliteRanges) {
          const value = satelliteAvgs[index][1]
          index = index + 1
          if (value !== null) {
            const date = new Date(timestamp).toISOString()
            satelliteWriteStream.write(
              `${code},${date},${value},${min},${max}\n`
            )
          }
        }
      }
    }

    console.log('Deleting values from hybam sediments table...')
    await this.sedimentsHybamRepository.deleteAll()

    console.log('Inserting hybam sediments...')
    await this.sedimentsHybamRepository.insertFromCSV(
      sedimentsFilePath,
      sedimentsHeader
    )
    console.log('Hybam sediments insertion finished.')

    console.log(
      'Deleting values from hybam satellite derived sediments table...'
    )
    await this.satelliteDerivedSedimentsHybamRepository.deleteAll()

    console.log('Inserting hybam satellite derived sediments...')
    await this.satelliteDerivedSedimentsHybamRepository.insertFromCSV(
      satelliteFilePath,
      satelliteHeader
    )
    console.log('Hybam satellite derived sediments insertion finished.')
    fs.unlinkSync(sedimentsFilePath)
    fs.unlinkSync(satelliteFilePath)
  }

  private async fetchSediments(stationId: string) {
    let resp = await axios.get(
      `http://hybam.omp.obs-mip.fr:8080/hybamvisu-web/faces/Display.xhtml?stati=${stationId}&login=iagomachado&langue=pt_BR&data_types=2-0_2-1&ref=1&newchart=yes&site=1`
    )
    const $ = cheerio.load(resp.data)
    let url = $('script[charset="UTF-8"]').first().attr('src')
    resp = await axios.get(url)
    url = String(resp.data).match(/http.*json/g)[0]
    resp = await axios.get(url)
    if (resp.data.name_0?.startsWith('Satellite')) {
      return {
        satelliteRanges: resp.data.ranges_0,
        satelliteAvgs: resp.data.averages_0,
      }
    }
    return {
      sediments: resp.data.averages_0,
      satelliteRanges: resp.data.ranges_1,
      satelliteAvgs: resp.data.averages_1,
    }
  }
}

export { DownloadSedimentsHybamSeeder }
