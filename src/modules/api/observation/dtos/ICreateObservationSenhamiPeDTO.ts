export interface ICreateObservationSenhamiPeDTO {
  stationCode: string
  timestamp: Date
  temperature?: number
  relativeHumidity?: number
  rain?: number
  level?: number
}
