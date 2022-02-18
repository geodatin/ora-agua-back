import { Point } from 'geojson'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

import { ObservationAna } from '../../observation/models/ObservationAna'

@Entity({ name: 'station_ana' })
class StationAna {
  @PrimaryColumn()
  code: number

  @Column({ nullable: true })
  id: number

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  watershed: string

  @Column({ nullable: true })
  subwatershed: string

  @Column({ nullable: true })
  river: string

  @Column({ nullable: true })
  state: string

  @Column({ nullable: true })
  city: string

  @Column({ nullable: true })
  country: string

  @Column({ nullable: true })
  responsible: string

  @Column({ nullable: true })
  operator: string

  @Column({ type: 'geometry', srid: 4326, nullable: true })
  location: Point

  @Column({ name: 'drenage_area', type: 'double precision', nullable: true })
  drenageArea: number

  @Column({ nullable: true })
  type: string

  @Column({ nullable: true })
  operating: boolean

  @Column({ nullable: true })
  telemetric: boolean

  @Column({ nullable: true })
  climatologic: boolean

  @Column({ nullable: true })
  pluviometer: boolean

  @Column({ name: 'rain_register', nullable: true })
  rainRegister: boolean

  @Column({ nullable: true })
  scale: boolean

  @Column({ name: 'level_register', nullable: true })
  levelRegister: boolean

  @Column({ name: 'liquid_discharge', nullable: true })
  liquidDischarge: boolean

  @Column({ nullable: true })
  sediments: boolean

  @Column({ name: 'water_quality', nullable: true })
  waterQuality: boolean

  @Column({ name: 'evaporation_tank', nullable: true })
  evaporationTank: boolean

  @Column({
    name: 'pluviometric_period_start',
    type: 'timestamptz',
    nullable: true,
  })
  pluviometricPeriodStart: Date

  @Column({
    name: 'rain_register_period_start',
    type: 'timestamptz',
    nullable: true,
  })
  rainRegisterPeriodStart: Date

  @Column({
    name: 'evaporation_tank_period_start',
    type: 'timestamptz',
    nullable: true,
  })
  evaporationTankPeriodStart: Date

  @Column({
    name: 'climatologic_period_start',
    type: 'timestamptz',
    nullable: true,
  })
  climatologicPeriodStart: Date

  @Column({
    name: 'telemetric_period_start',
    type: 'timestamptz',
    nullable: true,
  })
  telemetricPeriodStart: Date

  @Column({ name: 'scale_period_start', type: 'timestamptz', nullable: true })
  scalePeriodStart: Date

  @Column({
    name: 'level_register_period_start',
    type: 'timestamptz',
    nullable: true,
  })
  levelRegisterPeriodStart: Date

  @Column({
    name: 'liquid_discharge_period_start',
    type: 'timestamptz',
    nullable: true,
  })
  liquidDischargePeriodStart: Date

  @Column({
    name: 'sediments_period_start',
    type: 'timestamptz',
    nullable: true,
  })
  sedimentsPeriodStart: Date

  @Column({
    name: 'water_quality_period_start',
    type: 'timestamptz',
    nullable: true,
  })
  waterQualityPeriodStart: Date

  @OneToMany(() => ObservationAna, (observation) => observation.stationCode)
  observations: ObservationAna[]
}

export { StationAna }
