import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'station_hybam' })
class StationHybam {
  @PrimaryColumn()
  code: string

  @Column()
  name: string

  @Column()
  type: string

  @Column()
  river: string

  @Column({ name: 'grand_basin' })
  grandBasin: string

  @Column()
  basin: string

  @Column({ type: 'float' })
  latitude: number

  @Column({ type: 'float' })
  longitude: number
}

export { StationHybam }
