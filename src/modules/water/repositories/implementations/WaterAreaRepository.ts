import { IVarianceRankingDTO } from '@modules/water/dtos/IVarianceRankingDTO'
import { IWaterAreaDTO } from '@modules/water/dtos/IWaterAreaDTO'
import { WaterArea } from '@modules/water/models/WaterArea'
import { getConnection, getRepository } from 'typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { IWaterAreaRepository } from '../IWaterAreaRepository'

class WaterAreaRepository implements IWaterAreaRepository {
  private repository: Repository<WaterArea>
  constructor() {
    this.repository = getRepository(WaterArea)
  }
  async getAreaByCountry({
    year,
  }: IWaterAreaDTO): Promise<{ sum: number; name: string }[]> {
    const query = await this.repository
      .createQueryBuilder('water')
      .select('water.country_name', 'name')
      .addSelect('water.km2_amaz', 'sum')
      .groupBy('name')
      .orderBy('sum', 'DESC')
      .addGroupBy('sum')
    if (year) {
      query.andWhere('water.year = :year', { year })
    } else {
      query.andWhere('water.year = :year', { year: 2020 })
    }
    return await query.getRawMany()
  }
  async getAmazonicArea({ country, year }: IWaterAreaDTO): Promise<number> {
    const { area } = await getConnection()
      .createQueryBuilder()
      .select('SUM(area)', 'area')
      .from((qb) => {
        qb.select('water.country_name', 'name')
          .addSelect('water.km2_amaz', 'area')
          .from(WaterArea, 'water')
          .groupBy('name')
          .addGroupBy('area')
        if (country) {
          qb.andWhere('water.country_name = :country', { country })
        }
        if (year) {
          qb.andWhere('water.year = :year', { year })
        } else {
          qb.andWhere('water.year = :year', { year: 2020 })
        }
        return qb
      }, 'water')
      .getRawOne()

    return area
  }
  async getVarianceRanking({
    initialYear,
    finalYear,
    order,
  }: IVarianceRankingDTO): Promise<{ sum: number; name: string }[]> {
    const series = await getConnection()
      .createQueryBuilder()
      .select('(final.area - initial.area)/100', 'sum')
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
  async getWaterAreaSeries(): Promise<
    { sum: number; year: string; name: string }[]
  > {
    const series = await this.repository
      .createQueryBuilder('water')
      .select('SUM(water_area)/100', 'sum')
      .addSelect('year', 'year')
      .addSelect('country_name', 'name')
      .orderBy('year', 'ASC')
      .groupBy('water.year')
      .addGroupBy('name')
      .getRawMany()
    return series
  }

  async getWaterArea({ country, year }: IWaterAreaDTO): Promise<number> {
    const query = this.repository
      .createQueryBuilder('water')
      .select('SUM(water_area)/100', 'area')

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
