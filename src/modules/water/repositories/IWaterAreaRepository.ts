import { IVarianceRankingDTO } from '../dtos/IVarianceRankingDTO'
import { IWaterAreaDTO } from '../dtos/IWaterAreaDTO'

interface IWaterAreaRepository {
  getAreaByCountry({
    year,
  }: IWaterAreaDTO): Promise<{ sum: number; name: string }[]>
  getWaterArea({ country, year }: IWaterAreaDTO): Promise<number>
  getAmazonicArea({ country, year }: IWaterAreaDTO): Promise<number>
  getWaterAreaSeries(): Promise<{ sum: number; year: string; name: string }[]>
  getVarianceRanking({
    initialYear,
    finalYear,
    order,
  }: IVarianceRankingDTO): Promise<{ sum: number; name: string }[]>
}

export { IWaterAreaRepository }
