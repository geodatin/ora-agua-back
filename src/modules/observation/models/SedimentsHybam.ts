import { StationHybam } from '@modules/station/models/StationHybam'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'sediments_hybam' })
class SedimentsHybam {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ type: 'float', name: 'concentration_mg_l' })
  concentrationMgL: number

  @ManyToOne(() => StationHybam, (station) => station.sediments)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  station: StationHybam
}

export { SedimentsHybam }
