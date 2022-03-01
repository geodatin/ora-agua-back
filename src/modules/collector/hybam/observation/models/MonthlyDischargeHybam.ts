import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { StationHybam } from '../../station/models/StationHybam'

@Entity({ name: 'monthly_discharge_hybam', schema: process.env.SCHEMA })
class MonthlyDischargeHybam {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ type: 'float', name: 'discharge_m3_s' })
  dischargeM3S: number

  @ManyToOne(() => StationHybam, (station) => station.monthlyDischarge)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  station: StationHybam
}

export { MonthlyDischargeHybam }
