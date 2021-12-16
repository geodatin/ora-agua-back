import { StationSinca } from '@modules/station/models/StationSinca'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('observation_sinca')
class ObservationSinca {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ type: 'float' })
  latitude: number

  @Column({ type: 'float' })
  longitude: number

  @Column({ type: 'float' })
  value: number

  @Column({ type: 'float', name: 'OD' })
  OD: number

  @Column({ type: 'float', name: 'electric_conductivity' })
  electricConductivity: number

  @Column({ type: 'float' })
  turbidity: number

  @Column({ type: 'float' })
  ph: number

  @Column({ type: 'float', name: 'sample_temperature' })
  sampleTemperature: number

  @Column({ type: 'float', name: 'total_dissolved_solid' })
  totalDissolvedSolid: number

  @Column({ type: 'float', name: 'total_nitrogen' })
  totalNitrogen: number

  @Column({ type: 'float', name: 'total_ortophosphate' })
  totalOrtophosphate: number

  @Column({ type: 'float', name: 'total_suspension_solid' })
  totalSuspensionSolid: number

  @ManyToOne(() => StationSinca, (station) => station.observations)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  station: StationSinca
}

export { ObservationSinca }
