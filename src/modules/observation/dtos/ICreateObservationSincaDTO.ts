interface ICreateObservationSincaDTO {
  stationCode: string
  timestamp: Date
  parameterId: number
  latitude: number
  longitude: number
  value: number
}

export { ICreateObservationSincaDTO }
