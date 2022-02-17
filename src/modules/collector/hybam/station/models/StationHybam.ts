import { Point } from 'geojson'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

import { DailyDischargeHybam } from '../../observation/models/DailyDischargeHybam'
import { DailyWaterLevelHybam } from '../../observation/models/DailyWaterLevelHybam'
import { GeochemistryHybam } from '../../observation/models/GeochemistryHybam'
import { MonthlyDischargeHybam } from '../../observation/models/MonthlyDischargeHybam'
import { MonthlyWaterLevelHybam } from '../../observation/models/MonthlyWaterLevelHybam'
import { PhysicalChemistryHybam } from '../../observation/models/PhysicalChemistryHybam'
import { SatelliteDerivedSedimentsHybam } from '../../observation/models/SatelliteDerivedSedimentsHybam'
import { SedimentsHybam } from '../../observation/models/SedimentsHybam'

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

  @Column({ type: 'geometry', srid: 4326, nullable: true })
  location: Point

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
