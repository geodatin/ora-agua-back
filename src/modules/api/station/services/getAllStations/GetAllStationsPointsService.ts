import { injectable, inject } from 'tsyringe'

import { IStationViewRepository } from '../../repositories/IStationViewRepository'

const geojson: any = require('geojson')

@injectable()
export class GetAllStationsPointsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute() {
    const stations = await this.stationViewRepository.getAllStations()
    return geojson.parse(stations, { GeoJSON: 'location' })
  }
}
