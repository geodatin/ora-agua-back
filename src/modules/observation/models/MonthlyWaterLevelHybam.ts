import { StationHybam } from '@modules/station/models/StationHybam'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'monthly_water_level_hybam' })
class MonthlyWaterLevelHybam {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ type: 'float', name: 'quota_cm' })
  quotaCm: number

  @ManyToOne(() => StationHybam, (station) => station.monthlyWaterLevel)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  station: StationHybam
}

export { MonthlyWaterLevelHybam }