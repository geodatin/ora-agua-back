interface ICreateObservationDTO {
  stationCode: number
  timestamp: Date
  rain: number
  qRain: number
  flowRate: number
  qFlowRate: number
  adoptedLevel: number
  qAdoptedLevel: number
}

export { ICreateObservationDTO }
