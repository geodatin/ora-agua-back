interface ITimeSeriesRqaDTO {
  x: String[]
  y?: Number[]
  ph?: Number[]
  OD?: Number[]
  electricConductivity?: Number[]
  turbidity?: Number[]
  sampleTemperature?: Number[]
  totalDissolvedSolid?: Number[]
  totalNitrogen?: Number[]
  totalOrtophosphate?: Number[]
  totalSuspensionSolid?: Number[]
}

interface ITimeSeriesRqaEntryDTO {
  x: Date
  y?: Number
  ph?: Number
  OD?: Number
  electricConductivity?: Number
  turbidity?: Number
  sampleTemperature?: Number
  totalDissolvedSolid?: Number
  totalNitrogen?: Number
  totalOrtophosphate?: Number
  totalSuspensionSolid?: Number
}

export { ITimeSeriesRqaDTO, ITimeSeriesRqaEntryDTO }
