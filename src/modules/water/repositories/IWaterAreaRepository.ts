import { IVarianceRankingDTO } from '../dtos/IVarianceRankingDTO'
import { IWaterAreaDTO } from '../dtos/IWaterAreaDTO'
import { IWaterAreaSeriesDTO } from '../dtos/IWaterAreaSeriesDTO'

interface IWaterAreaRepository {
  getWaterArea({ country, year }: IWaterAreaDTO): Promise<number>
  getWaterAreaSeries({
    country,
    order,
  }: IWaterAreaSeriesDTO): Promise<{ sum: number; year: string }[]>
  varianceRanking({
    initialYear,
    finalYear,
    order,
  }: IVarianceRankingDTO): Promise<{ sum: number; name: string }[]>
}

export { IWaterAreaRepository }
