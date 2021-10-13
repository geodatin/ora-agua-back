import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
class WaterArea {
  @Column({ name: 'km2_amaz', type: 'float', nullable: true })
  km2Amaz: number

  @Column({ name: 'km2_pais', type: 'float', nullable: true })
  km2Pais: number

  @Column({ name: 'level2', type: 'float', nullable: true })
  level2: number

  @Column({ name: 'level3', type: 'float', nullable: true })
  level3: number

  @Column({ name: 'level4', type: 'float', nullable: true })
  level4: number

  @Column({ name: 'level5', type: 'float', nullable: true })
  level5: number

  @Column({ name: 'level6', type: 'float', nullable: true })
  level6: number

  @Column({ name: 'level7', type: 'float', nullable: true })
  level7: number

  @Column({ name: 'country_code', nullable: true })
  countryCode: string

  @PrimaryColumn({ name: 'country_name' })
  countryName: string

  @Column({ name: 'country_acronym', nullable: true })
  countryAcronym: string

  @Column({ name: 'water_percentage', type: 'float', nullable: true })
  waterPercentage: number

  @Column({ name: 'water_area', type: 'float', nullable: true })
  waterArea: number

  @PrimaryColumn({ name: 'class' })
  class: number

  @PrimaryColumn({ type: 'integer' })
  year: number

  @Column({ name: 'lat', type: 'float', nullable: true })
  lat: number

  @Column({ name: 'lon', type: 'float', nullable: true })
  lon: number
}

export { WaterArea }
