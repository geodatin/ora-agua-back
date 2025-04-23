import axios from 'axios'
import moment from 'moment'
import { injectable, inject } from 'tsyringe'

import { formatDateSenhami } from '../../../../../../utils/formatDate'
import { IStationSenhamiRepository } from '../../../station/repositories/IStationSenhamiRepository'
import { IObservationSenhamiRepository } from '../../repositories/IObservationSenhamiRepository'

@injectable()
class InsertObservationSenhamiSeeder {
  constructor(
    @inject('StationSenhamiRepository')
    private stationSenhamiRepository: IStationSenhamiRepository,
    @inject('ObservationSenhamiRepository')
    private observationSenhamiRepository: IObservationSenhamiRepository
  ) {}

  async execute(): Promise<void> {
    const stations = await this.stationSenhamiRepository.listStations()
    for (const station of stations) {
      const url = `http://200.105.169.186/grafest/jpGraph/graficas/jsongraf.php?x=${station.code}`
      const data = await axios.get(url)
      const [
        { data: dates },
        { data: temperatureValues },
        { data: speedValues },
        { data: humidityValues },
        { data: rainValues },
        { data: pressureValues },
        { data: levelValues },
      ] = data.data
      const length = dates.length
      const observations = []
      for (let i = 0; i < length; i++) {
        const date = formatDateSenhami(dates[i].split(' ')[0])
        const hour = dates[i].split(' ')[1] + ':00'
        const observation = {
          stationCode: station.code,
          timestamp: moment(date + ' ' + hour).toDate(),
          temperature:
            temperatureValues[i] === false ? null : temperatureValues[i],
          speed: speedValues[i] === false ? null : speedValues[i],
          relativeHumidity:
            humidityValues[i] === false ? null : humidityValues[i],
          rain: rainValues[i] === false ? null : rainValues[i],
          pressure: pressureValues[i] === false ? null : pressureValues[i],
          level: levelValues[i] === false ? null : levelValues[i],
        }
        observations.push(observation)
      }
      const lastDate =
        await this.observationSenhamiRepository.getStationMaxDate(station.code)
      if (moment(observations[0].timestamp).isAfter(moment(lastDate))) {
        await this.observationSenhamiRepository.create(observations)
      }
    }
  }
}

export { InsertObservationSenhamiSeeder }
