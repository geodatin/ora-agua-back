import { CountAllStationsController } from '@modules/api/station/services/countAllStations/CountAllStationsController'
import { CountStationsByCountryController } from '@modules/api/station/services/countStationsByCountry/CountStationsByCountryController'
import { CountStationsByNetworkController } from '@modules/api/station/services/countStationsByNetwork/CountStationsByNetworkController'
import { CountStationsByResponsibleController } from '@modules/api/station/services/countStationsByResponsible/CountStationsByResponsibleController'
import { CountStationsBySubwatershedController } from '@modules/api/station/services/countStationsBySubwatershed/CountStationsBySubwatershedController'
import { CountStationsByTypeController } from '@modules/api/station/services/countStationsByType/CountStationsByTypeController'
import { CountStatitonsByVariableController } from '@modules/api/station/services/countStationsByVariable/CountStationsByVariableController'
import { GetFilterOptionsController } from '@modules/api/station/services/getFilterOptions/GetFilterOprionsController'
import { GetNotificationsController } from '@modules/api/station/services/getNotifications/GetNotificationsController'
import { GetProjectedStationsPointsController } from '@modules/api/station/services/getProjectedStationsPoints/GetProjectedStationsPointsController'
import { GetStationsPointsController } from '@modules/api/station/services/getStationsPoints/GetStationsPointsController'
import { RankingRiversByStationsController } from '@modules/api/station/services/rankingRiversByStations/RankingRiversByStationsController'
import { Router } from 'express'

const stationRoutes = Router()

const countAllStationsContoller = new CountAllStationsController()
const countStationsByType = new CountStationsByTypeController()
const countStationsByCountry = new CountStationsByCountryController()
const countStationsBySubwatershed = new CountStationsBySubwatershedController()
const countStationsByResponsibleController =
  new CountStationsByResponsibleController()
const countStationsByNetworkController = new CountStationsByNetworkController()
const countStationsByVariablesController =
  new CountStatitonsByVariableController()
const getStationsPointsController = new GetStationsPointsController()
const rankingRiversByStationsController =
  new RankingRiversByStationsController()
const getFilterOptionsController = new GetFilterOptionsController()
const getNotificationsController = new GetNotificationsController()
const getProjectedStationsPointsController =
  new GetProjectedStationsPointsController()

stationRoutes.post('/count', countAllStationsContoller.handle)
stationRoutes.post('/count/type', countStationsByType.handle)
stationRoutes.post('/count/country', countStationsByCountry.handle)
stationRoutes.post('/count/subwatershed', countStationsBySubwatershed.handle)
stationRoutes.post(
  '/count/responsible',
  countStationsByResponsibleController.handle
)
stationRoutes.post('/count/network', countStationsByNetworkController.handle)
stationRoutes.post('/count/variable', countStationsByVariablesController.handle)
stationRoutes.post('/location', getStationsPointsController.handle)
stationRoutes.get(
  '/projected/location',
  getProjectedStationsPointsController.handle
)
stationRoutes.post('/notification', getNotificationsController.handle)
stationRoutes.post('/ranking/river', rankingRiversByStationsController.handle)
stationRoutes.get('/filter/:filterTerm', getFilterOptionsController.handle)

export { stationRoutes }
