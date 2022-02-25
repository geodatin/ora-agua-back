import { Point } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'station_senhami', schema: process.env.SCHEMA })
class StationSenhami {
  @PrimaryColumn()
  code: string

  @Column()
  name: string

  @Column()
  river: string

  @Column({ type: 'geometry', srid: 4326, nullable: true })
  location: Point

  @Column()
  city: string

  @Column('double precision')
  height: number
}

export { StationSenhami }
