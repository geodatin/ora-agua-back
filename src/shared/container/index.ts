import { IObservationHybamRepository } from '@modules/observation/repositories/IObservationHybamRepository'
import { IObservationSenhamiPeRepository } from '@modules/observation/repositories/IObservationSenhamiPeRespository'
import { IObservationSenhamiRepository } from '@modules/observation/repositories/IObservationSenhamiRepository'
import { IObservationSincaRepository } from '@modules/observation/repositories/IObservationSincaRepository'
import { IWaterQualityObservationRepository } from '@modules/observation/repositories/IWaterQualityObservationRepository'
import { DailyDischargeHybamRepository } from '@modules/observation/repositories/typeorm/DailyDischargeHybamRepository'
import { DailyWaterLevelHybamRepository } from '@modules/observation/repositories/typeorm/DailyWaterLevelHybamRepository'
import { GeochemistryHybamRepository } from '@modules/observation/repositories/typeorm/GeochemistryHybamRepository'
import { MonthlyDischargeHybamRepository } from '@modules/observation/repositories/typeorm/MonthlyDischargeHybamRepository'
import { MonthlyWaterLevelHybamRepository } from '@modules/observation/repositories/typeorm/MonthlyWaterLevelHybamRepository'
import { ObservationSenhamiPeRepository } from '@modules/observation/repositories/typeorm/ObservationSenhamiPeRepository'
import { ObservationSenhamiRepository } from '@modules/observation/repositories/typeorm/ObservationSenhamiRepository'
import { ObservationSincaRepository } from '@modules/observation/repositories/typeorm/ObservationSincaRepository'
import { PhysicalChemistryHybamRepository } from '@modules/observation/repositories/typeorm/PhysicalChemistryHybamRepository'
import { SatelliteDerivedSedimentsHybamRepository } from '@modules/observation/repositories/typeorm/SatelliteDerivedSedimentsHybamRepository'
import { SedimentsHybamRepository } from '@modules/observation/repositories/typeorm/SedimentsHybamRepository'
import { WaterQualityObservationRepository } from '@modules/observation/repositories/typeorm/WaterQualityObservationRepository'
import { IStationHybamRepository } from '@modules/station/repositories/IStationHybamRepository'
import { IStationSenhamiPeRepository } from '@modules/station/repositories/IStationSenhamiPeRepository'
import { IStationSenhamiRepository } from '@modules/station/repositories/IStationSenhamiRepository'
import { IStationSincaRepository } from '@modules/station/repositories/IStationSincaRepository'
import { StationHybamRepository } from '@modules/station/repositories/typeorm/StationHybamRepository'
import { StationSenhamiPeRepository } from '@modules/station/repositories/typeorm/StationSenhamiPeRepository'
import { StationSenhamiRepository } from '@modules/station/repositories/typeorm/StationSenhamiRepository'
import { StationSincaRepository } from '@modules/station/repositories/typeorm/StationSincaRepository'
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

container.registerSingleton<IObservationHybamRepository>(
  'DailyWaterLevelHybamRepository',
  DailyWaterLevelHybamRepository
)

container.registerSingleton<IObservationHybamRepository>(
  'MonthlyWaterLevelHybamRepository',
  MonthlyWaterLevelHybamRepository
)

container.registerSingleton<IObservationHybamRepository>(
  'DailyDischargeHybamRepository',
  DailyDischargeHybamRepository
)

container.registerSingleton<IObservationHybamRepository>(
  'MonthlyDischargeHybamRepository',
  MonthlyDischargeHybamRepository
)

container.registerSingleton<IObservationHybamRepository>(
  'SedimentsHybamRepository',
  SedimentsHybamRepository
)

container.registerSingleton<IObservationHybamRepository>(
  'SatelliteDerivedSedimentsHybamRepository',
  SatelliteDerivedSedimentsHybamRepository
)

container.registerSingleton<IObservationHybamRepository>(
  'PhysicalChemistryHybamRepository',
  PhysicalChemistryHybamRepository
)

container.registerSingleton<IObservationHybamRepository>(
  'GeochemistryHybamRepository',
  GeochemistryHybamRepository
)

container.registerSingleton<IWaterQualityObservationRepository>(
  'WaterQualityObservationRepository',
  WaterQualityObservationRepository
)

container.registerSingleton<IStationSincaRepository>(
  'StationSincaRepository',
  StationSincaRepository
)

container.registerSingleton<IStationSenhamiRepository>(
  'StationSenhamiRepository',
  StationSenhamiRepository
)

container.registerSingleton<IObservationSincaRepository>(
  'ObservationSincaRepository',
  ObservationSincaRepository
)

container.registerSingleton<IObservationSenhamiRepository>(
  'ObservationSenhamiRepository',
  ObservationSenhamiRepository
)

container.registerSingleton<IStationSenhamiPeRepository>(
  'StationSenhamiPeRepository',
  StationSenhamiPeRepository
)

container.registerSingleton<IObservationSenhamiPeRepository>(
  'ObservationSenhamiPeRepository',
  ObservationSenhamiPeRepository
)
