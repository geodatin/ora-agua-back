import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { StationHybam } from '../../station/models/StationHybam'

@Entity({ name: 'observation_hybam', schema: process.env.SCHEMA })
export class ObservationHybam {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column()
  ph: number

  @Column({ name: 'electric_conductivity' })
  electricConductivity: number

  @Column({ name: 'temperature' })
  temperature: number

  @Column({ name: 'total_ortophosphate' })
  totalOrtophosphate: number

  @Column({ name: 'flow_rate' })
  flowRate: number

  @Column({ name: 'level' })
  level: number

  @ManyToOne(() => StationHybam, (station) => station.monthlyWaterLevel)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  station: StationHybam
}
