import { StationSenhamiRepository } from '@modules/station/repositories/typeorm/StationSenhamiRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class InsertStationSenhamiSeeder {
  constructor(
    @inject('StationSenhamiRepository')
    private stationSenhamiRepository: StationSenhamiRepository
  ) {}

  async execute() {
    await this.stationSenhamiRepository.create({
      code: 'PI001',
      name: 'Pico de Loro - GPRS',
      city: 'Vinto',
      height: 2548,
      latitude: '-17.405300',
      longitude: '-66.320600',
    })

    await this.stationSenhamiRepository.create({
      code: 'PU017',
      name: 'Puente Abra - GPRS',
      city: 'Sacaba',
      height: 2636,
      latitude: '-17.396400',
      longitude: '-66.112500',
    })

    await this.stationSenhamiRepository.create({
      code: 'PU018',
      name: 'Puente Cajón - GPRS',
      city: 'Cochabamba',
      height: 2564,
      latitude: '-17.414200',
      longitude: '-66.182800',
    })

    await this.stationSenhamiRepository.create({
      code: 'PU025',
      name: 'Puente Mizque - GPRS',
      city: 'Mizque',
      height: 2055,
      latitude: '-17.921320',
      longitude: '-65.294400',
    })

    await this.stationSenhamiRepository.create({
      code: 'Pu024',
      name: 'Puente Omereque - GPRS',
      city: 'Omereque',
      height: 1594,
      latitude: '-18.128960',
      longitude: '-64.892600',
    })

    await this.stationSenhamiRepository.create({
      code: 'PU023',
      name: 'Puente Pojo - GPRS',
      city: 'Pojo',
      height: 1448,
      latitude: '-18.092770',
      longitude: '-64.698000',
    })

    await this.stationSenhamiRepository.create({
      code: 'RI010',
      name: 'Puente Chiñata (AUT)',
      city: 'Sacaba',
      height: 2840,
      latitude: '-17.403889',
      longitude: '-65.981941',
    })

    await this.stationSenhamiRepository.create({
      code: 'RI014',
      name: 'Rio Tahuamanu - GPRS',
      city: 'Porvenir',
      height: 200,
      latitude: '-11.271100',
      longitude: '-68.736900',
    })

    await this.stationSenhamiRepository.create({
      code: 'PU007',
      name: 'Puente Pailas - GPRS',
      city: 'Pailon',
      height: 200,
      latitude: '-17.683600',
      longitude: '-62.775300',
    })
  }
}

export { InsertStationSenhamiSeeder }
