interface ITimeSeriesDTO {
  x: String[]
  y?: Number[]
  rain?: Number[]
  level?: Number[]
  flowRate?: Number[]
  limits?:
    | { superiorLimit: number; inferiorLimit: number }
    | {
        rainSuperiorLimit: number
        rainInferiorLimit: number
        flowRateSuperiorLimit: number
        flowRateInferiorLimit: number
      }
}

interface ITimeSeriesEntryDTO {
  x: Date
  y?: Number
  rain?: Number
  level?: Number
  flowRate?: Number
}

export { ITimeSeriesDTO, ITimeSeriesEntryDTO }
