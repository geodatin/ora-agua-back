import { CountAllStationsController } from '@modules/station/services/countAllStations/CountAllStationsController'
import { CountStationsByCountryController } from '@modules/station/services/countStationsByCountry/CountStationsByCountryController'
import { CountStationsByResponsibleController } from '@modules/station/services/countStationsByResponsible/CountStationsByResponsibleController'
import { CountStationsBySubwatershedController } from '@modules/station/services/countStationsBySubwatershed/CountStationsBySubwatershedController'
import { CountStationsByTypeController } from '@modules/station/services/countStationsByType/CountStationsByTypeController'
import { GetFilterOptionsController } from '@modules/station/services/getFilterOptions/GetFilterOprionsController'
import { GetStationsPointsController } from '@modules/station/services/getStationsPoints/GetStationsPointsController'
import { RankingRiversByStationsController } from '@modules/station/services/rankingRiversByStations/RankingRiversByStationsController'
import { Router } from 'express'

const stationRoutes = Router()

const countAllStationsContoller = new CountAllStationsController()
const countStationsByType = new CountStationsByTypeController()
const countStationsByCountry = new CountStationsByCountryController()
const countStationsBySubwatershed = new CountStationsBySubwatershedController()
const countStationsByResponsibleController =
  new CountStationsByResponsibleController()
const getStationsPointsController = new GetStationsPointsController()
const rankingRiversByStationsController =
  new RankingRiversByStationsController()
const getFilterOptionsController = new GetFilterOptionsController()

stationRoutes.get('/count', countAllStationsContoller.handle)
stationRoutes.get('/count/type', countStationsByType.handle)
stationRoutes.get('/count/country', countStationsByCountry.handle)
stationRoutes.get('/count/subwatershed', countStationsBySubwatershed.handle)
stationRoutes.get(
  '/count/responsible',
  countStationsByResponsibleController.handle
)
stationRoutes.get('/location', getStationsPointsController.handle)
stationRoutes.get('/ranking/river', rankingRiversByStationsController.handle)
stationRoutes.get('/filter/:filterTerm', getFilterOptionsController.handle)

export { stationRoutes }
