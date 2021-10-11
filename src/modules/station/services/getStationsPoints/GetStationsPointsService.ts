import { IStationRepository } from '@modules/station/repositories/IStationRepository'
import { inject, injectable } from 'tsyringe'

const geojson: any = require('geojson')

@injectable()
class GetStationsPointsService {
  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository
  ) {}

  async execute() {
    const stations = await this.stationRepository.getAllStations()
    const parsed = geojson.parse(stations, { GeoJSON: 'location' })
    console.log(parsed)
    return parsed
  }
}

export { GetStationsPointsService }
