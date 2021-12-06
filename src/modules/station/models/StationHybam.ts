import { DailyWaterLevelHybam } from '@modules/observation/models/DailyWaterLevelHybam'
import { MonthlyWaterLevelHybam } from '@modules/observation/models/MonthlyWaterLevelHybam'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

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

  @OneToMany(() => DailyWaterLevelHybam, (dailyLevel) => dailyLevel.station)
  dailyWaterLevel: DailyWaterLevelHybam[]

  @OneToMany(
    () => MonthlyWaterLevelHybam,
    (monthlyLevel) => monthlyLevel.station
  )
  monthlyWaterLevel: MonthlyWaterLevelHybam[]
}

export { StationHybam }
