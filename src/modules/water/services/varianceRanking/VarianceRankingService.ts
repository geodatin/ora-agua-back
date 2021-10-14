import { IVarianceRankingDTO } from '@modules/water/dtos/IVarianceRankingDTO'
import { IWaterAreaRepository } from '@modules/water/repositories/IWaterAreaRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class VarianceRankingService {
  constructor(
    @inject('WaterAreaRepository')
    private waterAreaRepository: IWaterAreaRepository
  ) {}

  async execute({ order, initialYear, finalYear }: IVarianceRankingDTO) {
    const result = await this.waterAreaRepository.getVarianceRanking({
      initialYear,
      finalYear,
      order,
    })
    const x: string[] = []
    const y: number[] = []
    const pos: number[] = []
    for (const [index, element] of result.entries()) {
      x.push(element.name)
      y.push(element.sum)
      pos.push(index + 1)
    }
    return {
      x: x,
      series: [{ id: 'waterSurface', data: y }],
      position: pos,
    }
  }
}

export { VarianceRankingService }
