interface ICreateObservationSenhamiDTO {
  stationCode: string
  timestamp: Date
  temperature: number
  speed: number
  relativeHumidity: number
  rain: number
  pressure: number
  level: number
}

export { ICreateObservationSenhamiDTO }
