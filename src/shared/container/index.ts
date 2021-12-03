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
