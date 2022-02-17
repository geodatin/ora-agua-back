import { Point } from 'geojson'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

import { WaterQualitySinca } from '../../observation/models/WaterQualitySinca'

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

  @OneToMany(() => WaterQualitySinca, (quality) => quality.station)
  quality: WaterQualitySinca[]
}

export { StationSinca }
