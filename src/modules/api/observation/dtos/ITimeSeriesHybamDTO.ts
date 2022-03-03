interface ITimeSeriesHybamDTO {
  x: String[]
  y?: Number[]
  level?: Number[]
  flowRate?: Number[]
  ph?: Number[]
  electricConductivity?: Number[]
  sampleTemperature?: Number[]
  totalOrtophosphate?: Number[]
}

interface ITimeSeriesHybamEntryDTO {
  x: Date
  y?: Number
  level?: Number
  flowRate?: Number
  ph?: Number
  electricConductivity?: Number
  sampleTemperature?: Number
  totalOrtophosphate?: Number
}

export { ITimeSeriesHybamDTO, ITimeSeriesHybamEntryDTO }
