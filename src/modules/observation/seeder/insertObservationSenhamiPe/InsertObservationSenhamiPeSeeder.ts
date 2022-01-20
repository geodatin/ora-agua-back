/* eslint-disable camelcase */
import { ICreateObservationSenhamiPeDTO } from '@modules/observation/dtos/ICreateObservationSenhamiPeDTO'
import { IObservationSenhamiPeRepository } from '@modules/observation/repositories/IObservationSenhamiPeRespository'
import { StationSenhamiPe } from '@modules/station/models/StationSenhamiPe'
import { IStationSenhamiPeRepository } from '@modules/station/repositories/IStationSenhamiPeRepository'
import axios from 'axios'
import buildUrl from 'build-url'
import cheerio from 'cheerio'
import { utc } from 'moment'
import scraper from 'table-scraper'
import { injectable, inject } from 'tsyringe'

@injectable()
export class InsertObservationSenhamiPeSeeder {
  constructor(
    @inject('StationSenhamiPeRepository')
    private stationSenhamiPeRepository: IStationSenhamiPeRepository,
    @inject('ObservationSenhamiPeRepository')
    private observationSenhamiPeRepository: IObservationSenhamiPeRepository
  ) {}

  async execute(): Promise<void> {
    const stations = await this.stationSenhamiPeRepository.listStations()
    for (const station of stations) {
      const observations: ICreateObservationSenhamiPeDTO[] = []
      const dates = await this.getStationDates(station)
      const lastDate =
        await this.observationSenhamiPeRepository.getStationMaxDate(
          station.code
        )
      const lastDateAsParam = lastDate
        ? `${utc(lastDate).toISOString().split('-')[0]}${
            utc(lastDate).toISOString().split('-')[1]
          }`
        : null
      const lastDateAsParamIndex = dates.findIndex(
        (date) => date === lastDateAsParam
      )
      console.log(lastDateAsParamIndex)
      for (const [index, date] of dates.entries()) {
        if (index >= lastDateAsParamIndex) {
          const url = buildUrl(
            'https://www.senamhi.gob.pe/mapas/mapa-estaciones-2/_dato_esta_tipo02.php',
            {
              queryParams: {
                estaciones: station.code,
                CBOFiltro: date,
                t_e: station.type,
                estado: station.state,
                cod_old: station.oldCode,
                cate_esta: station.cate,
              },
            }
          )
          const table = await scraper.get(url)
          console.log(url)
          let header = ''
          for (const key in table[1][0]) {
            header += `${table[1][0][key]}`
          }
          if (
            header ===
            'AÑO / MES / DÍATEMPERATURA (°C)HUMEDAD RELATIVA (%)PRECIPITACIÓN (mm/día)'
          ) {
            for (const [index, value] of table[1].entries()) {
              if (index > 1) {
                const observation: ICreateObservationSenhamiPeDTO = {
                  stationCode: station.code,
                  timestamp: utc(value[0]).toDate(),
                  temperature: isNaN(value[1]) ? null : Number(value[1]),
                  level: null,
                  relativeHumidity: isNaN(value[3]) ? null : Number(value[3]),
                  rain: isNaN(value[4]) ? null : Number(value[4]),
                }
                if (
                  utc(observation.timestamp).isAfter(utc(lastDate)) ||
                  !lastDate
                ) {
                  console.log(observation)
                  observations.push(observation)
                }
              }
            }
          } else if (header === 'AÑO / MES / DÍANIVEL DEL RIO (m)') {
            for (const [index, value] of table[1].entries()) {
              if (index > 1) {
                const observation06: ICreateObservationSenhamiPeDTO = {
                  stationCode: station.code,
                  timestamp: utc(value[0] + ' ' + '06:00:00').toDate(),
                  temperature: null,
                  level: isNaN(value[1]) ? null : Number(value[1]),
                  relativeHumidity: null,
                  rain: null,
                }
                if (
                  utc(observation06.timestamp).isAfter(utc(lastDate)) ||
                  !lastDate
                ) {
                  observations.push(observation06)
                  console.log(observation06)
                }

                const observation10: ICreateObservationSenhamiPeDTO = {
                  stationCode: station.code,
                  timestamp: utc(value[0] + ' ' + '10:00:00').toDate(),
                  temperature: null,
                  level: isNaN(value[2]) ? null : Number(value[2]),
                  relativeHumidity: null,
                  rain: null,
                }
                if (
                  utc(observation10.timestamp).isAfter(utc(lastDate)) ||
                  !lastDate
                ) {
                  observations.push(observation10)
                  console.log(observation10)
                }

                const observation14: ICreateObservationSenhamiPeDTO = {
                  stationCode: station.code,
                  timestamp: utc(value[0] + ' ' + '14:00:00').toDate(),
                  temperature: null,
                  level: isNaN(value[3]) ? null : Number(value[3]),
                  relativeHumidity: null,
                  rain: null,
                }
                if (
                  utc(observation14.timestamp).isAfter(utc(lastDate)) ||
                  !lastDate
                ) {
                  observations.push(observation14)
                  console.log(observation14)
                }

                const observation18: ICreateObservationSenhamiPeDTO = {
                  stationCode: station.code,
                  timestamp: utc(value[0] + ' ' + '18:00:00').toDate(),
                  temperature: null,
                  level: isNaN(value[4]) ? null : Number(value[4]),
                  relativeHumidity: null,
                  rain: null,
                }
                if (
                  utc(observation18.timestamp).isAfter(utc(lastDate)) ||
                  !lastDate
                ) {
                  observations.push(observation18)
                  console.log(observation18)
                }
              }
            }
          } else if (
            header ===
            'AÑO / MES / DÍAHORATEMPERATURA (°C)PRECIPITACIÓN (mm/hora)HUMEDAD (%)DIRECCION DEL VIENTO (°)VELOCIDAD DEL VIENTO (m/s)'
          ) {
            for (const [index, value] of table[1].entries()) {
              if (index > 0) {
                const observation: ICreateObservationSenhamiPeDTO = {
                  stationCode: station.code,
                  timestamp: utc(value[0] + ' ' + value[1]).toDate(),
                  temperature: isNaN(value[2]) ? null : Number(value[2]),
                  level: null,
                  relativeHumidity: isNaN(value[4]) ? null : Number(value[4]),
                  rain: isNaN(value[3]) ? null : Number(value[3]),
                }
                if (
                  utc(observation.timestamp).isAfter(utc(lastDate)) ||
                  !lastDate
                ) {
                  console.log(observation)
                  observations.push(observation)
                }
              }
            }
          } else if (
            header ===
            'AÑO / MES / DÍAHORANIVEL DEL RIO (m)PRECIPITACIÓN (mm/hora)'
          ) {
            for (const [index, value] of table[1].entries()) {
              if (index > 0) {
                const observation: ICreateObservationSenhamiPeDTO = {
                  stationCode: station.code,
                  timestamp: utc(value[0] + ' ' + value[1]).toDate(),
                  temperature: null,
                  level: isNaN(value[2]) ? null : Number(value[2]),
                  relativeHumidity: null,
                  rain: isNaN(value[3]) ? null : Number(value[3]),
                }
                if (
                  utc(observation.timestamp).isAfter(utc(lastDate)) ||
                  !lastDate
                ) {
                  console.log(observation)
                  observations.push(observation)
                }
              }
            }
          }
        }
        await this.observationSenhamiPeRepository.create(observations)
      }
    }
  }

  async getStationDates(station: StationSenhamiPe): Promise<string[]> {
    const { data: html } = await axios.get(
      'https://www.senamhi.gob.pe/mapas/mapa-estaciones-2/map_red_graf.php',
      {
        params: {
          cod: station.code,
          estado: station.state,
          tipo_esta: station.type,
          cate: station.cate,
          cod_old: station.oldCode,
        },
      }
    )
    const $ = cheerio.load(html)
    const dates = []
    $('#CBOFiltro')
      .find('option')
      .each((index, value) => {
        const date = $(value).text()
        dates.push(date.replace('-', ''))
      })
    console.log(dates)
    return dates
  }
}