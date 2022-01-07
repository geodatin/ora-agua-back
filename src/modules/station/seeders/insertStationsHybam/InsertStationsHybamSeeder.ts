import { ICreateStationHybamDTO } from '@modules/station/dtos/ICreateStationHybamDTO'
import { IStationHybamRepository } from '@modules/station/repositories/IStationHybamRepository'
import axios from 'axios'
import { inject, injectable } from 'tsyringe'

const baseUrl = 'http://hybam.omp.obs-mip.fr:8080/geoserver/'
const stationsUrls = {
  reference:
    baseUrl +
    'wfs?service=WFS&version=1.1.1&request=GetFeature&typename=so-hybam%3AHybam%20reference%20network&outputFormat=application/json',
  altimetric:
    baseUrl +
    'wfs?service=WFS&version=1.1.1&request=GetFeature&typename=so-hybam%3Aso-hybam%20virtual&outputFormat=application/json',
  quality:
    baseUrl +
    'wfs?service=WFS&version=1.1.1&request=GetFeature&typename=so-hybam%3Aso-hybam%20virtual%20qual&outputFormat=application/json',
  'so-hybam':
    baseUrl +
    'wfs?service=WFS&version=1.1.1&request=GetFeature&typename=so-hybam%3Aso-hybam%20stations&outputFormat=application/json',
}

@injectable()
class InsertStationsHybamSeeder {
  constructor(
    @inject('StationHybamRepository')
    private stationHybamRepository: IStationHybamRepository
  ) {}

  async execute() {
    for (const type of Object.keys(stationsUrls)) {
      const stations: ICreateStationHybamDTO[] = []
      const url = stationsUrls[type]
      const { data } = await axios.get(url)
      data.features.forEach((feature) => {
        const station: ICreateStationHybamDTO = {
          code: feature.properties.id_station,
          name: feature.properties.nom,
          type: type,
          river: feature.properties.description,
          grandBasin: feature.properties.grandbassin,
          basin: feature.properties.bassin,
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
        }
        stations.push(station)
      })
      await this.stationHybamRepository.createMany(stations)
    }
    await this.stationHybamRepository.deleteStationsOutOfBasin()
  }
}

export { InsertStationsHybamSeeder }
