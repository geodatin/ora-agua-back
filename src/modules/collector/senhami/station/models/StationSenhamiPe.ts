import { Point } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'station_senhami_pe', schema: process.env.SCHEMA })
class StationSenhamiPe {
  @PrimaryColumn()
  code: string

  @Column()
  name: string

  @Column({ type: 'geometry', srid: 4326, nullable: true })
  location: Point

  @Column({ name: 'old_code' })
  oldCode: string

  @Column()
  state: string

  @Column()
  cate: string

  @Column()
  type: string
}

export { StationSenhamiPe }
