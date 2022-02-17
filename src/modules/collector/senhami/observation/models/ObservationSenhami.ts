import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('observation_senhami')
class ObservationSenhami {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ type: 'double precision', nullable: true })
  temperature: number

  @Column({ type: 'double precision', nullable: true })
  speed: number

  @Column({
    name: 'relative_humidity',
    type: 'double precision',
    nullable: true,
  })
  relativeHumidity: number

  @Column({ type: 'double precision', nullable: true })
  rain: number

  @Column({ type: 'double precision', nullable: true })
  pressure: number

  @Column({ type: 'double precision', nullable: true })
  level: number
}

export { ObservationSenhami }
