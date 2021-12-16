import { ICreateObservationSincaDTO } from '@modules/observation/dtos/ICreateObservationSincaDTO'
import { IObservationSincaRepository } from '@modules/observation/repositories/IObservationSincaRepository'
import { avoidNull } from '@utils/avoidNull'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

const parameterProperty = {
  1: 'electricConductivity',
  2: 'OD',
  3: 'ph',
  4: 'totalDissolvedSolid',
  6: 'totalSuspensionSolid',
  7: 'sampleTemperature',
  8: 'turbidity',
  40: 'totalOrtophosphate',
  43: 'totalNitrogen',
}

@injectable()
class DownloadObservationSincaSeeder {
  constructor(
    @inject('ObservationSincaRepository')
    private observationSincaRepository: IObservationSincaRepository
  ) {}

  async execute() {
    let url = `http://geoibol.com/geoserver/geosinca/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geosinca%3Aitem_medicion&outputFormat=application%2Fjson&maxFeatures=1`

    const { data } = await axios.get(url)

    const totalFeatures = data.totalFeatures

    const lastUpdateTotalFeatures = this.getLastUpdateTotalFeatures()

    if (totalFeatures > lastUpdateTotalFeatures) {
      console.log('Downloading data from sinca...')
      const observationsMap = new Map<string, ICreateObservationSincaDTO>()

      const maxFeatures = 1000
      let startIndex = 0
      while (startIndex < totalFeatures) {
        url = `http://geoibol.com/geoserver/geosinca/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geosinca%3Aitem_medicion&outputFormat=application%2Fjson&maxFeatures=${maxFeatures}&startIndex=${startIndex}`
        const { data } = await axios.get(url)
        data.features.forEach((feature) => {
          const hour = feature.properties.medicion_hora.includes(' ')
            ? feature.properties.medicion_hora.split(' ')[1]
            : feature.properties.medicion_hora

          const stationCode = feature.properties.codigo_registro

          const timestamp = new Date(
            feature.properties.medicion_fecha.replace('Z', 'T') + hour + 'Z'
          ).toISOString()

          const key = stationCode + timestamp

          const property =
            parameterProperty[feature.properties.item_parametro_id]

          const value = feature.properties.valor_medicion

          if (property) {
            if (observationsMap.has(key)) {
              const observation = observationsMap.get(key)
              observation[property] = value
              observationsMap.set(key, observation)
            } else {
              const observation: ICreateObservationSincaDTO = {
                stationCode,
                timestamp,
                latitude: feature.properties.medicion_lat,
                longitude: feature.properties.medicion_lon,
              }
              observation[property] = value
              observationsMap.set(key, observation)
            }
          }
        })
        startIndex = startIndex + maxFeatures
      }

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
        'station_code,timestamp,latitude,longitude,"OD",electric_conductivity,turbidity,ph,sample_temperature,total_dissolved_solid,total_nitrogen,total_ortophosphate,total_suspension_solid'

      writeStream.write(header + '\n')

      for (const observation of observationsMap.values()) {
        writeStream.write(
          // eslint-disable-next-line prettier/prettier
          `${observation.stationCode},${observation.timestamp},${observation.latitude},${observation.longitude},${avoidNull(observation.OD)},${avoidNull(observation.electricConductivity)},${avoidNull(observation.turbidity)},${avoidNull(observation.ph)},${avoidNull(observation.sampleTemperature)},${avoidNull(observation.totalDissolvedSolid)},${avoidNull(observation.totalNitrogen)},${avoidNull(observation.totalOrtophosphate)},${avoidNull(observation.totalSuspensionSolid)}\n`
        )
      }

      console.log('Deleting data from observation_sinca table...')
      await this.observationSincaRepository.deleteAll()

      console.log('Inserting new data into table...')
      await this.observationSincaRepository.insertFromCSV(filePath, header)
      console.log('Insertion finished.')

      fs.unlinkSync(filePath)

      this.updateFile(totalFeatures)
    } else {
      console.log('There is no new data from sinca.')
    }
  }

  private getLastUpdateTotalFeatures(): number {
    const file = fs.readFileSync(
      path.resolve(__dirname, 'files', 'lastUpdate.json')
    )
    const { totalFeatures } = JSON.parse(file.toString())
    return totalFeatures
  }

  private async updateFile(totalFeatures: number): Promise<void> {
    fs.writeFileSync(
      path.resolve(__dirname, 'files', 'lastUpdate.json'),
      JSON.stringify({
        totalFeatures,
        date: new Date().toLocaleString('pt-BR'),
      })
    )
  }
}

export { DownloadObservationSincaSeeder }
