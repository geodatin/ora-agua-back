import { ICreateObservationSincaDTO } from '@modules/observation/dtos/ICreateObservationSincaDTO'
import { IObservationSincaRepository } from '@modules/observation/repositories/IObservationSincaRepository'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

@injectable()
class DownloadObservationSincaSeeder {
  constructor(
    @inject('ObservationSincaRepository')
    private observationSincaRepository: IObservationSincaRepository
  ) {}

  async execute() {
    const observationsCount = await this.observationSincaRepository.getCount()

    let url = `http://geoibol.com/geoserver/geosinca/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geosinca%3Aitem_medicion&outputFormat=application%2Fjson&maxFeatures=1`

    const { data } = await axios.get(url)

    const totalFeatures = data.totalFeatures
    if (totalFeatures > observationsCount) {
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'tmp',
        `observation_sinca.csv`
      )
      const writeStream = fs.createWriteStream(filePath, {
        encoding: 'utf8',
      })
      const header =
        'station_code,timestamp,parameter_id,latitude,longitude,value'

      writeStream.write(header + '\n')

      const maxFeatures = 1000
      let startIndex = 0
      while (startIndex < totalFeatures) {
        url = `http://geoibol.com/geoserver/geosinca/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geosinca%3Aitem_medicion&outputFormat=application%2Fjson&maxFeatures=${maxFeatures}&startIndex=${startIndex}`
        const { data } = await axios.get(url)
        for (const feature of data.features) {
          const hour = feature.properties.medicion_hora.includes(' ')
            ? feature.properties.medicion_hora.split(' ')[1]
            : feature.properties.medicion_hora
          const observation: ICreateObservationSincaDTO = {
            stationCode: feature.properties.codigo_registro,
            timestamp: new Date(
              feature.properties.medicion_fecha.replace('Z', 'T') + hour + 'Z'
            ),
            parameterId: feature.properties.item_parametro_id,
            latitude: feature.properties.medicion_lat,
            longitude: feature.properties.medicion_lon,
            value:
              feature.properties.valor_medicion === null
                ? ''
                : feature.properties.valor_medicion,
          }

          writeStream.write(
            // eslint-disable-next-line
            `${observation.stationCode},${observation.timestamp.toISOString()},${observation.parameterId},${observation.latitude},${observation.longitude},${observation.value}\n`
          )
        }
        startIndex = startIndex + maxFeatures
      }

      await this.observationSincaRepository.deleteAll()

      await this.observationSincaRepository.insertFromCSV(filePath, header)

      fs.unlinkSync(filePath)
    }
  }
}

export { DownloadObservationSincaSeeder }
