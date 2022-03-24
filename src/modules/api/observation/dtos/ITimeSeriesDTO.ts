interface ITimeSeriesDTO {
  x: String[]
  y?: Number[]
  rain?: Number[]
  level?: Number[]
  flowRate?: Number[]
  limits?:
    | { superiorLimit: number; inferiorLimit: number }
    | {
        rain: {
          superiorLimit: number
          inferiorLimit: number
        }
        flowRate: {
          superiorLimit: number
          inferiorLimit: number
        }
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
