import { IDailyDischargeHybamRepository } from '@modules/observation/repositories/IDailyDischargeHybamRepository'
import { IDailyWaterLevelHybamRepository } from '@modules/observation/repositories/IDailyWaterLevelHybamRepository'
import { IMonthlyDischargeHybamRepository } from '@modules/observation/repositories/IMonthlyDischargeHybamRepository'
import { IMonthlyWaterLevelHybamRepository } from '@modules/observation/repositories/IMonthlyWaterLevelHybamRepository'
import { ISatelliteDerivedSedimentsHybamRepository } from '@modules/observation/repositories/ISatelliteDerivedSedimentsHybamRepository'
import { ISedimentsHybamRepository } from '@modules/observation/repositories/ISedimentsHybamRepository'
import { DailyDischargeHybamRepository } from '@modules/observation/repositories/typeorm/DailyDischargeHybamRepository'
import { DailyWaterLevelHybamRepository } from '@modules/observation/repositories/typeorm/DailyWaterLevelHybamRepository'
import { MonthlyDischargeHybamRepository } from '@modules/observation/repositories/typeorm/MonthlyDischargeHybamRepository'
import { MonthlyWaterLevelHybamRepository } from '@modules/observation/repositories/typeorm/MonthlyWaterLevelHybamRepository'
import { SatelliteDerivedSedimentsHybamRepository } from '@modules/observation/repositories/typeorm/SatelliteDerivedSedimentsHybamRepository'
import { SedimentsHybamRepository } from '@modules/observation/repositories/typeorm/SedimentsHybamRepository'
import { IStationHybamRepository } from '@modules/station/repositories/IStationHybamRepository'
import { StationHybamRepository } from '@modules/station/repositories/typeorm/StationHybamRepository'
import { WaterAreaRepository } from '@modules/water/repositories/implementations/WaterAreaRepository'
import { IWaterAreaRepository } from '@modules/water/repositories/IWaterAreaRepository'
import { container } from 'tsyringe'

import { IObservationRepository } from '../../modules/observation/repositories/IObservationRepository'
import { ObservationRepository } from '../../modules/observation/repositories/typeorm/ObservationRepository'
import { IStationRepository } from '../../modules/station/repositories/IStationRepository'
import { StationRepository } from '../../modules/station/repositories/typeorm/StationRepository'

container.registerSingleton<IStationRepository>(
  'StationRepository',
  StationRepository
)

container.registerSingleton<IObservationRepository>(
  'ObservationRepository',
  ObservationRepository
)

container.registerSingleton<IWaterAreaRepository>(
  'WaterAreaRepository',
  WaterAreaRepository
)

container.registerSingleton<IStationHybamRepository>(
  'StationHybamRepository',
  StationHybamRepository
)

container.registerSingleton<IDailyWaterLevelHybamRepository>(
  'DailyWaterLevelHybamRepository',
  DailyWaterLevelHybamRepository
)

container.registerSingleton<IMonthlyWaterLevelHybamRepository>(
  'MonthlyWaterLevelHybamRepository',
  MonthlyWaterLevelHybamRepository
)

container.registerSingleton<IDailyDischargeHybamRepository>(
  'DailyDischargeHybamRepository',
  DailyDischargeHybamRepository
)

container.registerSingleton<IMonthlyDischargeHybamRepository>(
  'MonthlyDischargeHybamRepository',
  MonthlyDischargeHybamRepository
)

container.registerSingleton<ISedimentsHybamRepository>(
  'SedimentsHybamRepository',
  SedimentsHybamRepository
)

container.registerSingleton<ISatelliteDerivedSedimentsHybamRepository>(
  'SatelliteDerivedSedimentsHybamRepository',
  SatelliteDerivedSedimentsHybamRepository
)
