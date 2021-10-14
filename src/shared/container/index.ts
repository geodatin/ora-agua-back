import { WaterAreaRepository } from '@modules/water/repositories/implementations/WaterAreaRepository'
import { IWaterAreaRepository } from '@modules/water/repositories/IWaterAreaRepository'
import { container } from 'tsyringe'

import { ObservationRepository } from '../../modules/observation/repositories/implementations/ObservationRepository'
import { IObservationRepository } from '../../modules/observation/repositories/IObservationRepository'
import { StationRepository } from '../../modules/station/repositories/implementations/StationRepository'
import { IStationRepository } from '../../modules/station/repositories/IStationRepository'

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
