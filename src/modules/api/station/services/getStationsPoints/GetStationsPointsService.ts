// import moment from 'moment'
import moment from 'moment'
import { inject, injectable } from 'tsyringe'

import { IGetStationsRequestDTO } from '../../dtos/IGetStationsDTO'
import { IStationViewRepository } from '../../repositories/IStationViewRepository'

const geojson: any = require('geojson')

@injectable()
export class GetStationsPointsService {
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

      const isSuperiorAlert =
        isOverSuperiorFlowRateLimit || isOverSuperiorLevelLimit

      const isInferiorAlert =
        isUnderInferiorFlowRateLimit || isUnderInferiorLevelLimit

      const isLast3Days = moment(station.lastUpdate).isAfter(
        moment().subtract(30, 'days')
      )

      if (isInferiorAlert && isLast3Days) {
        station.situation = 'alert'
      } else if (isSuperiorAlert && isLast3Days) {
        station.situation = 'emergency'
      } else {
        station.situation = 'normal'
      }

      station.hasData = true
      delete station.flowRateLimits
      delete station.levelLimits
      return station
    })
    const parsed = geojson.parse(stations, { GeoJSON: 'location' })
    return parsed
  }
}
