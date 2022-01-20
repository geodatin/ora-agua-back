import { CountAllStationsController } from '@modules/station/services/countAllStations/CountAllStationsController'
import { CountStationsByCountryController } from '@modules/station/services/countStationsByCountry/CountStationsByCountryController'
import { CountStationsByNetworkController } from '@modules/station/services/countStationsByNetwork/CountStationsByNetworkController'
import { CountStationsByResponsibleController } from '@modules/station/services/countStationsByResponsible/CountStationsByResponsibleController'
import { CountStationsBySubwatershedController } from '@modules/station/services/countStationsBySubwatershed/CountStationsBySubwatershedController'
import { CountStationsByTypeController } from '@modules/station/services/countStationsByType/CountStationsByTypeController'
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
const countStationsByNetworkController = new CountStationsByNetworkController()
const getStationsPointsController = new GetStationsPointsController()
const rankingRiversByStationsController =
  new RankingRiversByStationsController()

stationRoutes.post('/count', countAllStationsContoller.handle)
stationRoutes.post('/count/type', countStationsByType.handle)
stationRoutes.post('/count/country', countStationsByCountry.handle)
stationRoutes.post('/count/subwatershed', countStationsBySubwatershed.handle)
stationRoutes.post(
  '/count/responsible',
  countStationsByResponsibleController.handle
)
stationRoutes.post('/count/network', countStationsByNetworkController.handle)
stationRoutes.post('/location', getStationsPointsController.handle)
stationRoutes.post('/ranking/river', rankingRiversByStationsController.handle)

export { stationRoutes }
