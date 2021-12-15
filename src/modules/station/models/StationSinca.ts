import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('station_sinca')
class StationSinca {
  @PrimaryColumn()
  code: string

  @Column()
  name: string

  @Column()
  reference: string

  @Column()
  latitude: number

  @Column()
  longitude: number

  @Column()
  height: number
}

export { StationSinca }
