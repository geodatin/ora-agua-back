import { ICreateStationSenhamiPeDTO } from '@modules/station/dtos/ICreateStationSenhamiPeDTO'
import { IStationSenhamiPeRepository } from '@modules/station/repositories/IStationSenhamiPeRepository'
import filesystem from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

@injectable()
export class InsertStationSenhamiPeSeeder {
  constructor(
    @inject('StationSenhamiPeRepository')
    private stationSenhamiPeRepository: IStationSenhamiPeRepository
  ) {}

  async execute() {
    const filePath = path.join(
      path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp'),
      'stationSenhamiPe.json'
    )
    const data = filesystem.readFileSync(filePath, 'utf8')
    const stations = JSON.parse(data)
    for (const station of stations) {
      const newStation: ICreateStationSenhamiPeDTO = {
        name: station.nom,
        cate: station.cate,
        latitude: station.lat,
        longitude: station.lon,
        code: station.cod,
        oldCode: station.cod_old ? station.cod_old : null,
        state: station.estado,
        type: station.ico,
      }
      await this.stationSenhamiPeRepository.create(newStation)
    }
  }
}
