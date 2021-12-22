import { Point } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('station_senhami_pe')
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
  type: string

  @Column()
  cate: string
}

export { StationSenhamiPe }
