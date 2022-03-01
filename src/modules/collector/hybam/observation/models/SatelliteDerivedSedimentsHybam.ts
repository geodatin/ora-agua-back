import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { StationHybam } from '../../station/models/StationHybam'

@Entity({
  name: 'satellite_derived_sediments_hybam',
  schema: process.env.SCHEMA,
})
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
