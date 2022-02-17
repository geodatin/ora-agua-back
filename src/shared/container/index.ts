import { ILastObservationRhaViewRepository } from '@modules/api/observation/repositories/ILastObservationRhaViewRepository'
import { ILastUpdateViewRepository } from '@modules/api/observation/repositories/ILastUpdateViewRepository'
import { IObservationRhaViewRepository } from '@modules/api/observation/repositories/IObservationRhaViewRepository'
import { LastObservationRhaViewRepository } from '@modules/api/observation/repositories/typeorm/LastObservationRhaViewRepository'
import { LastUpdateViewRepository } from '@modules/api/observation/repositories/typeorm/LastUpdateViewRepository'
import { ObservationRhaViewRepository } from '@modules/api/observation/repositories/typeorm/ObservationRhaViewRepository'
import { IStationViewRepository } from '@modules/api/station/repositories/IStationViewRepository'
import { StationViewRepository } from '@modules/api/station/repositories/typeorm/StationViewRepository'
import { IObservationRepository } from '@modules/collector/ana/observation/repositories/IObservationRepository'
import { IWaterQualityObservationRepository } from '@modules/collector/ana/observation/repositories/IWaterQualityObservationRepository'
import { ObservationRepository } from '@modules/collector/ana/observation/repositories/typeorm/ObservationRepository'
import { WaterQualityObservationRepository } from '@modules/collector/ana/observation/repositories/typeorm/WaterQualityObservationRepository'
import { IStationRepository } from '@modules/collector/ana/station/repositories/IStationRepository'
import { StationRepository } from '@modules/collector/ana/station/repositories/typeorm/StationRepository'
import { IObservationHybamRepository } from '@modules/collector/hybam/observation/repositories/IObservationHybamRepository'
import { DailyDischargeHybamRepository } from '@modules/collector/hybam/observation/repositories/typeorm/DailyDischargeHybamRepository'
import { DailyWaterLevelHybamRepository } from '@modules/collector/hybam/observation/repositories/typeorm/DailyWaterLevelHybamRepository'
import { GeochemistryHybamRepository } from '@modules/collector/hybam/observation/repositories/typeorm/GeochemistryHybamRepository'
import { MonthlyDischargeHybamRepository } from '@modules/collector/hybam/observation/repositories/typeorm/MonthlyDischargeHybamRepository'
import { MonthlyWaterLevelHybamRepository } from '@modules/collector/hybam/observation/repositories/typeorm/MonthlyWaterLevelHybamRepository'
import { PhysicalChemistryHybamRepository } from '@modules/collector/hybam/observation/repositories/typeorm/PhysicalChemistryHybamRepository'
import { SatelliteDerivedSedimentsHybamRepository } from '@modules/collector/hybam/observation/repositories/typeorm/SatelliteDerivedSedimentsHybamRepository'
import { SedimentsHybamRepository } from '@modules/collector/hybam/observation/repositories/typeorm/SedimentsHybamRepository'
import { IStationHybamRepository } from '@modules/collector/hybam/station/repositories/IStationHybamRepository'
import { StationHybamRepository } from '@modules/collector/hybam/station/repositories/typeorm/StationHybamRepository'
import { IObservationIdeamRepository } from '@modules/collector/ideam/observation/repositories/IObservationIdeamRepository'
import { IWaterQualityIdeamRepository } from '@modules/collector/ideam/observation/repositories/IWaterQualityIdeamRepository'
import { ObservationIdeamRepository } from '@modules/collector/ideam/observation/repositories/typeorm/ObservationIdeamRepository'
import { WaterQualityIdeamRepository } from '@modules/collector/ideam/observation/repositories/typeorm/WaterQualityIdeamRepository'
import { IStationIdeamRepository } from '@modules/collector/ideam/station/repositories/IStationIdeamRepository'
import { StationIdeamRepository } from '@modules/collector/ideam/station/repositories/typeorm/StationIdeamRepository'
import { IObservationSenhamiPeRepository } from '@modules/collector/senhami/observation/repositories/IObservationSenhamiPeRespository'
import { IObservationSenhamiRepository } from '@modules/collector/senhami/observation/repositories/IObservationSenhamiRepository'
import { ObservationSenhamiPeRepository } from '@modules/collector/senhami/observation/repositories/typeorm/ObservationSenhamiPeRepository'
import { ObservationSenhamiRepository } from '@modules/collector/senhami/observation/repositories/typeorm/ObservationSenhamiRepository'
import { IStationSenhamiPeRepository } from '@modules/collector/senhami/station/repositories/IStationSenhamiPeRepository'
import { IStationSenhamiRepository } from '@modules/collector/senhami/station/repositories/IStationSenhamiRepository'
import { StationSenhamiPeRepository } from '@modules/collector/senhami/station/repositories/typeorm/StationSenhamiPeRepository'
import { StationSenhamiRepository } from '@modules/collector/senhami/station/repositories/typeorm/StationSenhamiRepository'
import { IWaterQualitySincaRepository } from '@modules/collector/sinca/observation/repositories/IWaterQualitySincaRepository'
import { WaterQualitySincaRepository } from '@modules/collector/sinca/observation/repositories/typeorm/WaterQualitySincaRepository'
import { IStationSincaRepository } from '@modules/collector/sinca/station/repositories/IStationSincaRepository'
import { StationSincaRepository } from '@modules/collector/sinca/station/repositories/typeorm/StationSincaRepository'
import { container } from 'tsyringe'

container.registerSingleton<IStationRepository>(
  'StationRepository',
  StationRepository
)

container.registerSingleton<IObservationRepository>(
  'ObservationRepository',
  ObservationRepository
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

container.registerSingleton<IWaterQualitySincaRepository>(
  'WaterQualitySincaRepository',
  WaterQualitySincaRepository
)

container.registerSingleton<IStationIdeamRepository>(
  'StationIdeamRepository',
  StationIdeamRepository
)

container.registerSingleton<IObservationIdeamRepository>(
  'ObservationIdeamRepository',
  ObservationIdeamRepository
)

container.registerSingleton<IWaterQualityIdeamRepository>(
  'WaterQualityIdeamRepository',
  WaterQualityIdeamRepository
)

container.registerSingleton<IStationViewRepository>(
  'StationViewRepository',
  StationViewRepository
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

container.registerSingleton<IObservationRhaViewRepository>(
  'ObservationRhaViewRepository',
  ObservationRhaViewRepository
)

container.registerSingleton<ILastObservationRhaViewRepository>(
  'LastObservationRhaViewRepository',
  LastObservationRhaViewRepository
)

container.registerSingleton<ILastUpdateViewRepository>(
  'LastUpdateViewRepository',
  LastUpdateViewRepository
)
