import { StationHybam } from '@modules/station/models/StationHybam'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'physical_chemistry_hybam' })
class PhysicalChemistryHybam {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ type: 'float', name: 'temperature_c' })
  temperatureC: number

  @Column({ type: 'float', name: 'conductivity_us' })
  conductivityUs: number

  @Column({ type: 'float', name: 'ph' })
  ph: number

  @ManyToOne(() => StationHybam, (station) => station.physicalChemistry)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  station: StationHybam
}

export { PhysicalChemistryHybam }
