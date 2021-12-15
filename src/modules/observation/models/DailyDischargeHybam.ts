import { StationHybam } from '@modules/station/models/StationHybam'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'daily_discharge_hybam' })
class DailyDischargeHybam {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ type: 'float', name: 'discharge_m3_s' })
  dischargeM3S: number

  @ManyToOne(() => StationHybam, (station) => station.dailyDischarge)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  station: StationHybam
}

export { DailyDischargeHybam }
