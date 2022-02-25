import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { StationAna } from '../../station/models/StationAna'

@Entity({ name: 'water_quality_observation', schema: process.env.SCHEMA })
class WaterQualityObservation {
  @PrimaryColumn({ name: 'station_code' })
  @ManyToOne((type) => StationAna)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  stationCode: number

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ name: 'rain', type: 'float', nullable: true })
  rain: number

  @Column({ name: 'depth', type: 'float', nullable: true })
  depth: number

  @Column({ name: 'sample_temperature', type: 'float', nullable: true })
  sampleTemperature: number

  @Column({ name: 'ph', type: 'float', nullable: true })
  ph: number

  @Column({ name: 'turbidity', type: 'float', nullable: true })
  haze: number

  @Column({ name: 'electric_conductivity', type: 'float', nullable: true })
  electricConductivity: number

  @Column({ name: 'OD', type: 'float', nullable: true })
  OD: number

  @Column({ name: 'total_suspension_solid', type: 'float', nullable: true })
  totalSuspensionSolid: number

  @Column({ name: 'total_dissolved_solid', type: 'float', nullable: true })
  totalDissolvedSolid: number

  @Column({ name: 'total_nitrogen', type: 'float', nullable: true })
  totalNitrogen: number

  @Column({ name: 'total_ortophosphate', type: 'float', nullable: true })
  totalOrtophosphate: number
}

export { WaterQualityObservation }
