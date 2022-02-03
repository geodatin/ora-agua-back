import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'
import { IStationViewRepository } from '@modules/station/repositories/IStationViewRepository'
import { inject, injectable } from 'tsyringe'

const geojson: any = require('geojson')

@injectable()
class GetStationsPointsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute(filters: IFiltersDTO, network?: string) {
    const stations = (await this.stationViewRepository.getStations(
      filters,
      network
    )) as any
    stations.map((station) => {
      if (station.rainQ > 10) {
        station.situation = 'alert'
      } else if (station.rainQ > 5) {
        station.situation = 'attention'
      } else {
        station.situation = 'normal'
      }
      delete station.rainQ
      return station
    })
    const parsed = geojson.parse(stations, { GeoJSON: 'location' })
    return parsed
  }
}

export { GetStationsPointsService }
