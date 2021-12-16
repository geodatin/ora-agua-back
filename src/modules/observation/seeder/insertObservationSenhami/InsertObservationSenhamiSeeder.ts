import { IObservationSenhamiRepository } from '@modules/observation/repositories/IObservationSenhamiRepository'
import { IStationRepository } from '@modules/station/repositories/IStationRepository'
import { injectable, inject } from 'tsyringe'

@injectable()
class InsertObservationSenhamiSeeder {
  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository,
    @inject('ObservationSenhamiRepository')
    private observationSenhamiRepository: IObservationSenhamiRepository
  ) {}

  async execute(): Promise<void> {}
}

export { InsertObservationSenhamiSeeder }
