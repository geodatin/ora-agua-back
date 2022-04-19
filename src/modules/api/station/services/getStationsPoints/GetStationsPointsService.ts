import moment from 'moment'
import { inject, injectable } from 'tsyringe'

import { IGetStationsRequestDTO } from '../../dtos/IGetStationsDTO'
import { IStationViewRepository } from '../../repositories/IStationViewRepository'

const geojson: any = require('geojson')

@injectable()
class GetStationsPointsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute({ filters }: IGetStationsRequestDTO) {
    const stations = await this.stationViewRepository.getStations({
      filters,
    })
    stations.map((station) => {
      const isOverSuperiorFlowRateLimit =
        station.flowRate > station.flowRateLimits.superiorLimit &&
        station.flowRate

      const isOverSuperiorLevelLimit =
        station.level > station.levelLimits.superiorLimit && station.level

      const isUnderInferiorFlowRateLimit =
        station.flowRate < station.flowRateLimits.inferiorLimit &&
        station.flowRate

      const isUnderInferiorLevelLimit =
        station.level < station.levelLimits.inferiorLimit && station.level

      const isAlert =
        isOverSuperiorFlowRateLimit ||
        isOverSuperiorLevelLimit ||
        isUnderInferiorFlowRateLimit ||
        isUnderInferiorLevelLimit

      const isLast3Days = moment(station.lastUpdate).isAfter(
        moment().subtract(30, 'days')
      )

      if (isAlert && isLast3Days) {
        station.situation = 'alert'
      } else {
        station.situation = 'normal'
      }

      if (
        station.rain ||
        station.level ||
        station.flowRate ||
        station.network === 'RQA'
      ) {
        station.hasData = true
      } else {
        station.hasData = false
      }

      delete station.flowRateLimits
      delete station.levelLimits
      return station
    })
    const parsed = geojson.parse(stations, { GeoJSON: 'location' })
    return parsed
  }
}

export { GetStationsPointsService }
