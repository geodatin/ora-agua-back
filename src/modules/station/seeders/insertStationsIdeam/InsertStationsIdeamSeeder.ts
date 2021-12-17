import { ICreateStationIdeamDTO } from '@modules/station/dtos/ICreateStationIdeamDTO'
import { IStationIdeamRepository } from '@modules/station/repositories/IStationIdeamRepository'
import axios from 'axios'
// eslint-disable-next-line import/no-unresolved
import { parse } from 'csv-parse/sync'
import { inject, injectable } from 'tsyringe'

@injectable()
class InsertStationsIdeamSeeder {
  constructor(
    @inject('StationIdeamRepository')
    private stationIdeamRepository: IStationIdeamRepository
  ) {}

  async execute() {
    const url =
      'http://fews.ideam.gov.co/colombia/data/ReporteTablaEstaciones.csv'

    const { data } = await axios.get(url)

    const stationsRequest = parse(data, {
      columns: true,
      relaxColumnCountMore: true,
      encoding: 'utf-8',
    })

    const stations: ICreateStationIdeamDTO[] = stationsRequest.map(
      (station) => {
        const dto: ICreateStationIdeamDTO = {
          code: station.id,
          name: station.nombre.split('[')[0].trim(),
          latitude: parseFloat(station.lat),
          longitude: parseFloat(station.lng),
        }
        return dto
      }
    )

    await this.stationIdeamRepository.createMany(stations)
  }
}

export { InsertStationsIdeamSeeder }
