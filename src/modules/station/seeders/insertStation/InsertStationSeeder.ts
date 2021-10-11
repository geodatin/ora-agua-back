import axios from 'axios'
import { inject, injectable } from 'tsyringe'

import { formatBoolean } from '../../../../utils/formatBoolean'
import { ICreateStationDTO } from '../../dtos/ICreateStationDTO'
import { IStationRepository } from '../../repositories/IStationRepository'

@injectable()
class InsertStationSeeder {
  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository
  ) {}

  async execute() {
    const stations = await this.formatStations()

    for (const station of stations) {
      await this.stationRepository.create(station)
    }
  }

  private async formatStations() {
    const allStations: ICreateStationDTO[] = []
    const codes = new Set()
    const telemetricStations = await this.fetchStations('telemetric')
    const conventionalStations = await this.fetchStations('conventional')
    for (const partialStation of telemetricStations) {
      const stationModel = await this.getStationFromCode(
        partialStation.codigoAdicional,
        partialStation.id
      )
      if (stationModel) {
        if (!codes.has(stationModel.code)) {
          codes.add(stationModel.code)
          allStations.push(stationModel)
        }
      }
    }
    for (const partialStation of conventionalStations) {
      const stationModel = await this.getStationFromCode(partialStation.id)
      if (stationModel) {
        if (!codes.has(stationModel.code)) {
          codes.add(stationModel.code)
          allStations.push(stationModel)
        }
      }
    }
    return allStations
  }

  private async getStationFromCode(
    stationCode: string,
    id = null
  ): Promise<ICreateStationDTO> {
    const {
      data: {
        items: [station],
      },
    } = await axios.get(
      `http://ows.snirh.gov.br/ords/prd12/ords_ana/hidro/estacao/${Number(
        stationCode
      )}`
    )
    if (station) {
      const stationModel = {
        code: station.codigo,
        id: id,
        name: station.nome,
        watershed: station.bacia,
        subwatershed: station.subbacia,
        river: station.rio,
        state: station.estado,
        city: station.municipio,
        responsible: station.responsavel,
        operator: station.operadora,
        latitude: station.latitude,
        longitude: station.longitude,
        drenageArea: station.areadrenagem,
        type: station.tipoestacao,
        operating: formatBoolean(station.operando),
        telemetric: formatBoolean(station.telemetrica),
        climatologic: formatBoolean(station.climatologica),
        pluviometer: formatBoolean(station.pluviometro),
        rainRegister: formatBoolean(station.registradorchuva),
        scale: formatBoolean(station.escala),
        levelRegister: formatBoolean(station.registradornivel),
        liquidDischarge: formatBoolean(station.descargaliquida),
        sediments: formatBoolean(station.sedimentos),
        waterQuality: formatBoolean(station.qualidadedaagua),
        evaporationTank: formatBoolean(station.tanqueevapo),
        pluviometricPeriodStart: station.periodopluviometroinicio,
        rainRegisterPeriodStart: station.periodoregistradorchuvainicio,
        evaporationTankPeriodStart: station.periodotanqueevapoinicio,
        climatologicPeriodStart: station.periodoclimatologicainicio,
        telemetricPeriodStart: station.periodotelemetricainicio,
        scalePeriodStart: station.periodoescalainicio,
        levelRegisterPeriodStart: station.periodoregistradornivelinicio,
        liquidDischargePeriodStart: station.periododescliquidainicio,
        sedimentsPeriodStart: station.periodosedimentosinicio,
        waterQualityPeriodStart: station.periodoqualaguainicio,
      }
      return stationModel
    }
  }

  async fetchStations(type: string) {
    const stations = []
    let page = 0
    let isLast = false
    const param =
      type === 'telemetric' ? 'estacaotelemetrica' : 'dadosHistoricos'
    do {
      const { data } = await axios.get(
        `https://www.snirh.gov.br/hidroweb/rest/api/${param}`,
        {
          params: {
            codigoBacia: 1,
            size: 1000,
            page: page,
          },
        }
      )
      data.content.forEach((station) => {
        stations.push(station)
      })
      isLast = data.last
      page++
    } while (!isLast)
    return stations
  }
}

export { InsertStationSeeder }
