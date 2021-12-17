import { Point } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('station_ideam')
class StationIdeam {
  @PrimaryColumn()
  code: string

  @Column()
  name: string

  @Column({ type: 'float' })
  latitude: number

  @Column({ type: 'float' })
  longitude: number

  @Column({ type: 'geometry' })
  geometry: Point
}

export { StationIdeam }
