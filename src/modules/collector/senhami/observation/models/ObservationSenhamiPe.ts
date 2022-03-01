import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'observation_senhami_pe', schema: process.env.SCHEMA })
class ObservationSenhamiPe {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ type: 'double precision', nullable: true })
  temperature: number

  @Column({
    name: 'relative_humidity',
    type: 'double precision',
    nullable: true,
  })
  relativeHumidity: number

  @Column({ type: 'double precision', nullable: true })
  rain: number

  @Column({ type: 'double precision', nullable: true })
  level: number
}

export { ObservationSenhamiPe }
