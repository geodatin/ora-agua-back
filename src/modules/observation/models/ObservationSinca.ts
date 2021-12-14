import { StationSinca } from '@modules/station/models/StationSinca'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('observation_sinca')
class ObservationSinca {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @PrimaryColumn({ type: 'integer', name: 'parameter_id' })
  parameterId: number

  @Column({ type: 'float' })
  latitude: number

  @Column({ type: 'float' })
  longitude: number

  @Column({ type: 'float' })
  value: number

  @Column()
  alert: string

  @Column()
  trend: string

  @Column()
  class: string

  @ManyToOne(() => StationSinca, (station) => station.observations)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  station: StationSinca
}

export { ObservationSinca }
