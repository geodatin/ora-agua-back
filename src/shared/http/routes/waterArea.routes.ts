import { AmazonicAreaController } from '@modules/water/services/amazonicArea/AmazonicAreaController'
import { AreaByCountryController } from '@modules/water/services/areaByCountry/AreaByCountryController'
import { GetWaterAreaController } from '@modules/water/services/getWaterArea/GetWaterAreaController'
import { GetWaterAreaSeriesController } from '@modules/water/services/getWaterAreaSeries/GetWaterAreaSeriesController'
import { VarianceRankingController } from '@modules/water/services/varianceRanking/VarianceRankingController'
import { Router } from 'express'

const waterAreaRoutes = Router()

const getWaterAreaController = new GetWaterAreaController()
const getWaterAreaSeriesController = new GetWaterAreaSeriesController()
const varianceRankingController = new VarianceRankingController()
const amazonicAreaController = new AmazonicAreaController()
const areaByCountryController = new AreaByCountryController()

waterAreaRoutes.get('/area', getWaterAreaController.handle)
waterAreaRoutes.get('/area/country', areaByCountryController.handle)
waterAreaRoutes.get('/amazonic/area', amazonicAreaController.handle)
waterAreaRoutes.get('/series', getWaterAreaSeriesController.handle)
waterAreaRoutes.get(
  '/variance/ranking/:initialYear/:finalYear',
  varianceRankingController.handle
)

export { waterAreaRoutes }
