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

  async execute(filters: IFiltersDTO) {
    const stations = await this.stationViewRepository.getStations(filters)
    const parsed = geojson.parse(stations, { GeoJSON: 'location' })
    return parsed
  }
}

export { GetStationsPointsService }
