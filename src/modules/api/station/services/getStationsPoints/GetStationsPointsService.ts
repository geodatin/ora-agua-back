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
      const isOverSuperiorLimit =
        (station.level > station.levelLimits.superiorLimit ||
          station.flowRate > station.flowRateLimits.superiorLimit) &&
        (station.level || station.flowRate)

      const isUnderInferiorLimit =
        (station.level < station.levelLimits.inferiorLimit ||
          station.flowRate < station.flowRateLimits.inferiorLimit) &&
        (station.level || station.flowRate)

      if (isOverSuperiorLimit || isUnderInferiorLimit) {
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

      delete station.rain
      delete station.level
      delete station.flowRate
      delete station.flowRateLimits
      delete station.levelLimits
      return station
    })
    const parsed = geojson.parse(stations, { GeoJSON: 'location' })
    return parsed
  }
}

export { GetStationsPointsService }
