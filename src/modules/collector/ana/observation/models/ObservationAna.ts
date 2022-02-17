import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { StationAna } from '../../station/models/StationAna'

@Entity({ name: 'observation_ana' })
class ObservationAna {
  @PrimaryColumn({ name: 'station_code' })
  @ManyToOne((type) => StationAna)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  stationCode: number

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ type: 'float', nullable: true })
  rain: number

  @Column({ name: 'q_rain', type: 'float', nullable: true })
  qRain: number

  @Column({ name: 'flow_rate', type: 'float', nullable: true })
  flowRate: number

  @Column({ name: 'q_flow_rate', type: 'float', nullable: true })
  qFlowRate: number

  @Column({ name: 'adopted_level', type: 'float', nullable: true })
  adoptedLevel: number

  @Column({ name: 'q_adopted_level', type: 'float', nullable: true })
  qAdoptedLevel: number
}

export { ObservationAna }
