import { ObservationSinca } from '@modules/observation/models/ObservationSinca'
import { Point } from 'geojson'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

@Entity('station_sinca')
class StationSinca {
  @PrimaryColumn()
  code: string

  @Column()
  name: string

  @Column()
  reference: string

  @Column()
  river: string

  @Column({ type: 'float' })
  latitude: number

  @Column({ type: 'float' })
  longitude: number

  @Column()
  height: number

  @Column({ type: 'geometry' })
  geometry: Point

  @OneToMany(() => ObservationSinca, (observation) => observation.station)
  observations: ObservationSinca[]
}

export { StationSinca }
