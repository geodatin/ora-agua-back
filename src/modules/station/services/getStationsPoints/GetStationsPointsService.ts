import { IStationRepository } from '@modules/station/repositories/IStationRepository'
import { inject, injectable } from 'tsyringe'

const geojson: any = require('geojson')

@injectable()
class GetStationsPointsService {
  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository
  ) {}

  async execute(telemetric?: boolean) {
    const stations = await this.stationRepository.getAllStations(telemetric)
    const parsed = geojson.parse(stations, { GeoJSON: 'location' })
    return parsed
  }
}

export { GetStationsPointsService }
