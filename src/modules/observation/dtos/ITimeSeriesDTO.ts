interface ITimeSeriesDTO {
  x: String[]
  y: Number[]
}

interface ITimeSeriesEntryDTO {
  x: Date
  y: Number
}

export { ITimeSeriesDTO, ITimeSeriesEntryDTO }
