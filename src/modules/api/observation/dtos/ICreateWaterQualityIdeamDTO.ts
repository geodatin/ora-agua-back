interface ICreateWaterQualityIdeamDTO {
  stationCode: string
  timestamp: string
  totalNitrogen?: number
  totalSuspensionSolid?: number
  OD?: number
}

export { ICreateWaterQualityIdeamDTO }
