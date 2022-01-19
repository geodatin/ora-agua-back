import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('observation_ideam')
class ObservationIdeam {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn()
  timestamp: Date

  @Column({ name: 'level_m', type: 'double precision' })
  levelM: number

  @Column({ name: 'flow_rate_mcs', type: 'double precision' })
  flowRateMcs: number

  @Column({ name: 'rain_mm_d', type: 'double precision' })
  rainMMd: number
}

export { ObservationIdeam }
