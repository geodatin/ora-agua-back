import { Geometry } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'south_america_country' })
class SouthAmericaCountry {
  @PrimaryColumn()
  id: number

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  acronym: string

  @Column({ nullable: true, type: 'double precision' })
  km2: number

  @Column({ type: 'geometry', srid: 4326, nullable: true })
  geometry: Geometry
}

export { SouthAmericaCountry }
