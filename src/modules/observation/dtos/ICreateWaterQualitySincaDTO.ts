interface ICreateWaterQualitySincaDTO {
  stationCode: string
  timestamp: string
  latitude: number
  longitude: number
  OD?: number
  electricConductivity?: number
  turbidity?: number
  ph?: number
  sampleTemperature?: number
  totalDissolvedSolid?: number
  totalNitrogen?: number
  totalOrtophosphate?: number
  totalSuspensionSolid?: number
}

export { ICreateWaterQualitySincaDTO }
