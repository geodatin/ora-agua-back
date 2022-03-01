interface ITimeSeriesDTO {
  x: String[]
  y?: Number[]
  rain?: Number[]
  level?: Number[]
  flowRate?: Number[]
}

interface ITimeSeriesEntryDTO {
  x: Date
  y?: Number
  rain?: Number
  level?: Number
  flowRate?: Number
}

export { ITimeSeriesDTO, ITimeSeriesEntryDTO }
