import { GetWaterAreaSeriesController } from '@modules/water/services/getWaterAreaSeriesService/GetWaterAreaSeriesController'
import { GetWaterAreaController } from '@modules/water/services/getWaterAreaService/GetWaterAreaController'
import { VarianceRankingController } from '@modules/water/services/varianceRankingService/VarianceRankingController'
import { Router } from 'express'

const waterAreaRoutes = Router()

const getWaterAreaController = new GetWaterAreaController()
const getWaterAreaSeriesController = new GetWaterAreaSeriesController()
const varianceRankingController = new VarianceRankingController()

waterAreaRoutes.get('/area', getWaterAreaController.handle)
waterAreaRoutes.get('/series/:country', getWaterAreaSeriesController.handle)
waterAreaRoutes.get(
  '/variance/ranking/:initialYear/:finalYear',
  varianceRankingController.handle
)

export { waterAreaRoutes }
