import axios from 'axios'
import fs from 'fs'
import moment from 'moment'
import path from 'path'
import { inject, injectable } from 'tsyringe'

import { formatDate } from '../../../../utils/formatDate'
import { sleep } from '../../../../utils/sleep'
import { IStationRepository } from '../../../station/repositories/IStationRepository'
import { ICreateObservationDTO } from '../../dtos/ICreateObservationDTO'
import { IObservationRepository } from '../../repositories/IObservationRepository'

@injectable()
class InsertObservationFromApiSeeder {
  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository,
    @inject('ObservationRepository')
    private observationRepository: IObservationRepository
  ) {}
  async execute(): Promise<void> {
    const stations = await this.stationRepository.getTelemetricStations()
    const { code } = await this.getLastUpdatedStation()
    const stationIndex = stations.findIndex((s) => s.code === code)
    for (const [index, station] of stations.entries()) {
      if (stationIndex <= index && station.id !== station.code) {
        await this.updateLastStation(station.code)
        const [initialDate, finalDate] = await this.getPeriod(station.id)
        if (initialDate) {
          const lastInsertedDate =
            await this.observationRepository.getStationMaxDate(station.code)
          const startDate = lastInsertedDate
            ? moment(lastInsertedDate).add(1, 'day')
            : moment(initialDate)
          const endDate = moment(finalDate)
          console.log(station.code, startDate)
          while (startDate.isSameOrBefore(endDate)) {
            const observations = await this.getObservationFromPeriod(
              startDate.toDate(),
              station.id
            )
            startDate.add(2, 'days')
            await this.observationRepository.createMany(observations)
          }
        }
      }
    }
    await this.updateLastStation(0)
  }

  async getObservationFromPeriod(
    start: Date,
    stationId: number
  ): Promise<ICreateObservationDTO[]> {
    const observations: ICreateObservationDTO[] = []
    console.log(start, stationId)
    try {
      const {
        data: [results],
      } = await axios.get(
        `https://www.snirh.gov.br/hidroweb/rest/api/documento/gerarTelemetricas`,
        {
          params: {
            codigosEstacoes: stationId,
            tipoArquivo: 3,
            periodoInicial: moment(start).toDate(),
            periodoFinal: moment(start).add(2, 'days').toDate(),
          },
        }
      )

      for (const [index, measurement] of results.medicoes.entries()) {
        const observation = {
          stationCode: Number(results.codigoEstacao),
          timestamp: moment(measurement.id.horDataHora).toDate(),
          rain: measurement.horChuva,
          qRain: measurement.horQChuva,
          adoptedLevel: measurement.horNivelAdotado,
          qAdoptedLevel: measurement.horQNivelAdotado,
          flowRate: measurement.horVazao,
          qFlowRate: measurement.horQVazao,
        }
        if (index < results.medicoes.length - 1) {
          observations.push(observation)
        }
      }
    } catch (err) {
      console.error(err.message, err.response)
      sleep(120000)
      throw err
    }
    return observations
  }

  async getPeriod(stationId: number): Promise<string[]> {
    try {
      const startDate = moment('1940-01-01')
      const {
        data: [results],
      } = await axios.get(
        `https://www.snirh.gov.br/hidroweb/rest/api/documento/gerarTelemetricas`,
        {
          params: {
            codigosEstacoes: stationId,
            tipoArquivo: 3,
            periodoInicial: moment(startDate).toDate(),
            periodoFinal: moment(startDate).add(1, 'days').toDate(),
          },
        }
      )
      const [initialDate, , finalDate] =
        results.peridoDisponibilidade.split(' ')
      return [formatDate(initialDate), formatDate(finalDate)]
    } catch (error) {
      return [null, null]
    }
  }

  async getLastUpdatedStation(): Promise<{ code: number }> {
    const file = fs.readFileSync(
      path.resolve(__dirname, 'files', 'stationCode.json')
    )
    const { code } = JSON.parse(file.toString())
    return { code }
  }

  async updateLastStation(code: number): Promise<void> {
    fs.writeFileSync(
      path.resolve(__dirname, 'files', 'stationCode.json'),
      JSON.stringify({ code: code })
    )
  }
}

export { InsertObservationFromApiSeeder }
