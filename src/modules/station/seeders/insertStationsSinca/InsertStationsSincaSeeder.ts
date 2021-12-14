import { ICreateStationSincaDTO } from '@modules/station/dtos/ICreateStationSincaDTO'
import { IStationSincaRepository } from '@modules/station/repositories/IStationSincaRepository'
import axios from 'axios'
import { inject, injectable } from 'tsyringe'

@injectable()
class InsertStationsSincaSeeder {
  constructor(
    @inject('StationSincaRepository')
    private stationSincaRepository: IStationSincaRepository
  ) {}

  async execute() {
    const stationsUrl =
      'https://geoibol.com/geoserver/geosinca/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geosinca%3Aitem_cuerpo_de_agua_monitoreo&maxFeatures=500&outputFormat=application%2Fjson'
    const { data } = await axios.get(stationsUrl)
    const stations: ICreateStationSincaDTO[] = []
    for (const feature of data.features) {
      const station: ICreateStationSincaDTO = {
        code: feature.properties.codigo.replace('\r', ''),
        name: feature.properties.nombre.replace('\r', ''),
        reference: feature.properties.referencia.replace('\r', ''),
        latitude: feature.properties.latitud,
        longitude: feature.properties.longitud,
        height: feature.properties.altura,
      }
      stations.push(station)
    }
    await this.stationSincaRepository.createMany(stations)
  }
}

export { InsertStationsSincaSeeder }
