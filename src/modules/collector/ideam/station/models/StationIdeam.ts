import { Point } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'station_ideam', schema: process.env.SCHEMA })
class StationIdeam {
  @PrimaryColumn()
  code: string

  @Column()
  name: string

  @Column()
  river: string

  @Column({ type: 'float' })
  latitude: number

  @Column({ type: 'float' })
  longitude: number

  @Column({ type: 'geometry' })
  geometry: Point
}

export { StationIdeam }
