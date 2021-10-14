import { IVarianceRankingDTO } from '@modules/water/dtos/IVarianceRankingDTO'
import { IWaterAreaDTO } from '@modules/water/dtos/IWaterAreaDTO'
import { IWaterAreaSeriesDTO } from '@modules/water/dtos/IWaterAreaSeriesDTO'
import { WaterArea } from '@modules/water/models/WaterArea'
import { getRepository } from 'typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { IWaterAreaRepository } from '../IWaterAreaRepository'

class WaterAreaRepository implements IWaterAreaRepository {
  private repository: Repository<WaterArea>
  constructor() {
    this.repository = getRepository(WaterArea)
  }
  async varianceRanking({
    initialYear,
    finalYear,
    order,
  }: IVarianceRankingDTO): Promise<{ sum: number; name: string }[]> {
    const series = await this.repository
      .createQueryBuilder()
      .select('final.area - initial.area', 'sum')
      .addSelect('initial.name', 'name')
      .from((qb) => {
        qb.select('water.country_name', 'name')
          .addSelect('SUM(water.water_area)', 'area')
          .from(WaterArea, 'water')
          .where('water.year = :initialYear', { initialYear })
          .groupBy('name')
        return qb
      }, 'initial')
      .innerJoin(
        (qb) => {
          qb.select('water.country_name', 'name')
            .addSelect('SUM(water.water_area)', 'area')
            .from(WaterArea, 'water')
            .where('water.year = :finalYear', { finalYear })
            .groupBy('name')
          return qb
        },
        'final',
        'final.name = initial.name'
      )
      .groupBy('initial.name')
      .addGroupBy('initial.area')
      .addGroupBy('final.area')
      .orderBy('sum', order === 'asc' ? 'ASC' : 'DESC')
      .getRawMany()
    return series
  }
  async getWaterAreaSeries({
    country,
    order,
  }: IWaterAreaSeriesDTO): Promise<{ sum: number; year: string }[]> {
    const series = await this.repository
      .createQueryBuilder('water')
      .select('SUM(water_area)', 'sum')
      .addSelect('year', 'year')
      .where('lower(water.country_name) = lower(:country)', { country })
      .orderBy('year', order === 'asc' ? 'ASC' : 'DESC')
      .groupBy('water.year')
      .getRawMany()
    return series
  }

  async getWaterArea({ country, year }: IWaterAreaDTO): Promise<number> {
    const query = this.repository
      .createQueryBuilder('water')
      .select('SUM(water_area)', 'area')

    if (country) {
      query.andWhere('water.country_name = :country', { country })
    }
    if (year) {
      query.andWhere('water.year = :year', { year })
    } else {
      query.andWhere('water.year = :year', { year: 2020 })
    }
    const { area } = await query.getRawOne()
    return area
  }
}

export { WaterAreaRepository }
