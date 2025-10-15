/* eslint-disable no-unmodified-loop-condition */
import axios from 'axios'
import { autoInjectable, inject } from 'tsyringe'

import { IStationRepository } from '../../../station/repositories/IStationRepository'
import { ICreateObservationDTO } from '../../dtos/ICreateObservationDTO'
import { IObservationRepository } from '../../repositories/IObservationRepository'

@autoInjectable()
export class UpdateObservationCollector {
  constructor(
    @inject('StationRepository')
    private stationRepository?: IStationRepository,
    @inject('ObservationRepository')
    private observationRepository?: IObservationRepository
  ) {}

  async run() {
    const { token, validUntil } = await this.authenticate()
    let validToken = token
    const stations = await this.stationRepository.getUpdateStations()
    console.log(`Inserting observations...`)
    for (const station of stations) {
      const tokenIsValid = this.isBeforeExpirationDate(validUntil)
      if (!tokenIsValid) {
        validToken = await this.authenticate()
      }
      const stationData = await this.getStationData(station.code, validToken)
      const transformedData = this.transformToObservationDTO(stationData)
      const CHUNK_SIZE = 1000
      const chunks = this.splitIntoChunks(transformedData, CHUNK_SIZE)
      for (const chunk of chunks) {
        await this.observationRepository.createMany(chunk)
      }
    }
    console.log(`Inserted observations...`)
  }

  async runFullSeries() {
    const { token, validUntil } = await this.authenticate()
    let validToken = token
    const stations = await this.stationRepository.getUpdateStations()

    for (const station of stations) {
      if (Number(station.code) <= 15555500) continue
      const currentDate = new Date()
      const endDate = new Date('2000-01-01')
      while (currentDate >= endDate) {
        const tokenIsValid = this.isBeforeExpirationDate(validUntil)
        if (!tokenIsValid) {
          const auth = await this.authenticate()
          validToken = auth.token
        }

        console.log(
          `Inserting observations for station ${station.code} for date ${
            currentDate.toISOString().split('T')[0]
          }`
        )

        const stationData = await this.getStationData(
          station.code,
          validToken,
          currentDate
        )

        const transformedData = this.transformToObservationDTO(stationData)
        const CHUNK_SIZE = 1000
        const chunks = this.splitIntoChunks(transformedData, CHUNK_SIZE)
        for (const chunk of chunks) {
          await this.observationRepository.createMany(chunk)
        }
        currentDate.setDate(currentDate.getDate() - 30)
      }
    }
  }

  transformToObservationDTO(data: any[]): ICreateObservationDTO[] {
    const transformedData = data?.map((element) => {
      return {
        stationCode: Number(element.codigoestacao),
        timestamp: new Date(element.Data_Hora_Medicao),
        rain: Number(element.Chuva_Adotada),
        qRain: Number(element.Chuva_Adotada_Status),
        flowRate: Number(element.Vazao_Adotada),
        qFlowRate: Number(element.Vazao_Adotada_Status),
        adoptedLevel: Number(element.Cota_Adotada),
        qAdoptedLevel: Number(element.Cota_Adotada_Status),
      }
    })
    const occurrenceMap = new Map<string, ICreateObservationDTO>()

    // Group observations by stationCode and timestamp
    transformedData.forEach((obs) => {
      const key = `${obs.stationCode}_${obs.timestamp.toISOString()}`

      if (!occurrenceMap.has(key)) {
        occurrenceMap.set(key, obs)
      }
    })
    return [...occurrenceMap.values()]
  }

  private isBeforeExpirationDate(date: string): boolean {
    const expirationDate = new Date(date)
    expirationDate.setMinutes(expirationDate.getMinutes() - 5)
    const currentDate = new Date()
    return currentDate < expirationDate
  }

  private splitIntoChunks(
    data: ICreateObservationDTO[],
    chunkSize: number
  ): ICreateObservationDTO[][] {
    const chunks: ICreateObservationDTO[][] = []
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize))
    }
    return chunks
  }

  async getStationData(stationCode: string, token: string, startDate?: Date) {
    const currentDate = new Date()
    const formattedDate = startDate
      ? startDate.toISOString().split('T')[0]
      : currentDate.toISOString().split('T')[0]

    const observationDataUrl =
      'https://www.ana.gov.br/hidrowebservice/EstacoesTelemetricas/HidroinfoanaSerieTelemetricaAdotada/v1'
    const response = await axios.get(observationDataUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        'Código da Estação': stationCode,
        'Tipo Filtro Data': 'DATA_LEITURA',
        'Range Intervalo de busca': 'DIAS_30',
        'Data de Busca (yyyy-MM-dd)': formattedDate,
      },
    })
    if (!response.data.items || response.data.items.length === 0) {
      return []
    }
    return response.data.items
  }
  async authenticate() {
    const authUrl =
      'https://www.ana.gov.br/hidrowebservice/EstacoesTelemetricas/OAUth/v1'
    const response = await axios.get(authUrl, {
      headers: {
        Identificador: process.env.ANA_LOGIN,
        senha: process.env.ANA_PASSWORD,
      },
    })
    return {
      token: response.data.items.tokenautenticacao,
      validUntil: response.data.items.validade,
    }
  }
}
