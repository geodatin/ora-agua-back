import { inject, injectable } from 'tsyringe'

import { IStationViewRepository } from '../../repositories/IStationViewRepository'

const geojson: any = require('geojson')

@injectable()
export class GetProjectedStationsPointsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute(network: string) {
    let stations
    if (network === 'rha') {
      stations = await this.stationViewRepository.getProjectedRhaStations()
    } else if (network === 'rqa') {
      stations = await this.stationViewRepository.getProjectedRqaStations()
    } else {
      const stationsRqa =
        await this.stationViewRepository.getProjectedRqaStations()
      const stationsRha =
        await this.stationViewRepository.getProjectedRhaStations()
      stations = stationsRha.concat(stationsRqa)
    }
    const parsed = geojson.parse(stations, { GeoJSON: 'location' })
    return parsed
  }
}
