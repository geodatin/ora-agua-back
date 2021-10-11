interface ICreateStationDTO {
  code: number
  id: number
  name: string
  watershed: string
  subwatershed: string
  river: string
  state: string
  city: string
  responsible: string
  operator: string
  latitude: string
  longitude: string
  drenageArea: number
  type: string
  operating: boolean
  telemetric: boolean
  climatologic: boolean
  pluviometer: boolean
  rainRegister: boolean
  scale: boolean
  levelRegister: boolean
  liquidDischarge: boolean
  sediments: boolean
  waterQuality: boolean
  evaporationTank: boolean
  pluviometricPeriodStart: Date
  rainRegisterPeriodStart: Date
  evaporationTankPeriodStart: Date
  climatologicPeriodStart: Date
  telemetricPeriodStart: Date
  scalePeriodStart: Date
  levelRegisterPeriodStart: Date
  liquidDischargePeriodStart: Date
  sedimentsPeriodStart: Date
  waterQualityPeriodStart: Date
}

export { ICreateStationDTO }
