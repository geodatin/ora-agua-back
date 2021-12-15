import { DailyDischargeHybam } from '@modules/observation/models/DailyDischargeHybam'
import { DailyWaterLevelHybam } from '@modules/observation/models/DailyWaterLevelHybam'
import { GeochemistryHybam } from '@modules/observation/models/GeochemistryHybam'
import { MonthlyDischargeHybam } from '@modules/observation/models/MonthlyDischargeHybam'
import { MonthlyWaterLevelHybam } from '@modules/observation/models/MonthlyWaterLevelHybam'
import { PhysicalChemistryHybam } from '@modules/observation/models/PhysicalChemistryHybam'
import { SatelliteDerivedSedimentsHybam } from '@modules/observation/models/SatelliteDerivedSedimentsHybam'
import { SedimentsHybam } from '@modules/observation/models/SedimentsHybam'
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

  @OneToMany(
    () => DailyDischargeHybam,
    (dailyDischarge) => dailyDischarge.station
  )
  dailyDischarge: DailyDischargeHybam[]

  @OneToMany(
    () => MonthlyDischargeHybam,
    (monthlyDischarge) => monthlyDischarge.station
  )
  monthlyDischarge: MonthlyDischargeHybam[]

  @OneToMany(() => SedimentsHybam, (sediment) => sediment.station)
  sediments: SedimentsHybam[]

  @OneToMany(
    () => SatelliteDerivedSedimentsHybam,
    (satelliteSediment) => satelliteSediment.station
  )
  satelliteSediments: SatelliteDerivedSedimentsHybam[]

  @OneToMany(
    () => PhysicalChemistryHybam,
    (physicalChemistry) => physicalChemistry.station
  )
  physicalChemistry: PhysicalChemistryHybam[]

  @OneToMany(() => GeochemistryHybam, (geochemistry) => geochemistry.station)
  geochemistry: GeochemistryHybam[]
}

export { StationHybam }
