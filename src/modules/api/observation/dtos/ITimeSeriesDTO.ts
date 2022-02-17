interface ITimeSeriesDTO {
  x: String[]
  y?: Number[]
  rain?: Number[]
  adoptedLevel?: Number[]
  flowRate?: Number[]
}

interface ITimeSeriesEntryDTO {
  x: Date
  y?: Number
  rain?: Number
  adoptedLevel?: Number
  flowRate?: Number
}

export { ITimeSeriesDTO, ITimeSeriesEntryDTO }
