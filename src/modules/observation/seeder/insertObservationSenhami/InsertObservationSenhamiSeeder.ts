import { IObservationSenhamiRepository } from '@modules/observation/repositories/IObservationSenhamiRepository'
import { IStationSenhamiRepository } from '@modules/station/repositories/IStationSenhamiRepository'
import { formatDateSenhami } from '@utils/formatDate'
import axios from 'axios'
import moment from 'moment'
import { injectable, inject } from 'tsyringe'

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
          temperature: temperatureValues[i],
          speed: speedValues[i],
          relativeHumidity: humidityValues[i],
          rain: rainValues[i],
          pressure: pressureValues[i],
          level: levelValues[i],
        }
        console.log(observation)
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
