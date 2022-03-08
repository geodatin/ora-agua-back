import { inject, injectable } from 'tsyringe'

import { IStationViewRepository } from '../../repositories/IStationViewRepository'

const geojson: any = require('geojson')

@injectable()
export class GetProjectedStationsPointsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute() {
    const stations = await this.stationViewRepository.getProjectedStations()

    const parsed = geojson.parse(stations, { GeoJSON: 'location' })
    return parsed
  }
}
