import { StationHybam } from '@modules/station/models/StationHybam'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'satellite_derived_sediments_hybam' })
class SatelliteDerivedSedimentsHybam {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ type: 'float', name: 'concentration_mg_l' })
  concentrationMgL: number

  @ManyToOne(() => StationHybam, (station) => station.satelliteSediments)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  station: StationHybam
}

export { SatelliteDerivedSedimentsHybam }
