interface ITimeSeriesDTO {
  x: String[]
  y?: Number[]
  rain?: Number[]
  level?: Number[]
  flowRate?: Number[]
  limits?:
    | {
        level: {
          superiorLimit: number
          inferiorLimit: number
        }
      }
    | {
        flowRate: {
          superiorLimit: number
          inferiorLimit: number
        }
      }
    | {
        level: {
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
