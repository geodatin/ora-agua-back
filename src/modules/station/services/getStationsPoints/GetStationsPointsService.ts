import { IGetStationsRequestDTO } from '@modules/station/dtos/IGetStationsDTO'
import { IStationViewRepository } from '@modules/station/repositories/IStationViewRepository'
import { inject, injectable } from 'tsyringe'

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
      if (station.rain > 10) {
        station.situation = 'alert'
      } else if (station.rain > 5) {
        station.situation = 'attention'
      } else {
        station.situation = 'normal'
      }

      if (station.rain || station.level || station.flowRate) {
        station.hasData = true
      } else {
        station.hasData = false
      }

      delete station.rain
      delete station.level
      delete station.flowRate
      return station
    })
    const parsed = geojson.parse(stations, { GeoJSON: 'location' })
    return parsed
  }
}

export { GetStationsPointsService }
