import { formatDate } from '@utils/formatDate'
import { sleep } from '@utils/sleep'
import axios from 'axios'
import { utc as moment } from 'moment'
import { inject, injectable } from 'tsyringe'

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
    for (const [, station] of stations.entries()) {
      const [initialDate] = await this.getPeriod(station.id)
      if (initialDate) {
        const lastInsertedDate =
          await this.observationRepository.getStationMaxDate(station.code)
        const startDate = lastInsertedDate
          ? moment(lastInsertedDate)
          : moment(initialDate)
        while (true) {
          const observations = await this.getObservationFromPeriod(
            startDate.toDate(),
            station.id
          )
          startDate.add(2, 'day')
          if (observations.length === 0) break
          console.log(
            `inserting ${observations.length} observations for station ${station.name}`
          )
          await this.observationRepository.createMany(observations)
        }
      }
    }
  }

  async getObservationFromPeriod(
    start: Date,
    stationId: number
  ): Promise<ICreateObservationDTO[]> {
    const observations: ICreateObservationDTO[] = []
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
        if (Number(results.codigoEstacao) === 17091550) continue
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
        if (
          index < results.medicoes.length - 1 &&
          moment(observation.timestamp).isAfter(start)
        ) {
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
}

export { InsertObservationFromApiSeeder }
