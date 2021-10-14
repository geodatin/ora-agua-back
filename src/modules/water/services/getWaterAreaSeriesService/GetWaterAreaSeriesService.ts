import { IWaterAreaSeriesDTO } from '@modules/water/dtos/IWaterAreaSeriesDTO'
import { IWaterAreaRepository } from '@modules/water/repositories/IWaterAreaRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetWaterAreaSeriesService {
  constructor(
    @inject('WaterAreaRepository')
    private waterAreaRepository: IWaterAreaRepository
  ) {}

  async execute({ country, order }: IWaterAreaSeriesDTO) {
    const series = await this.waterAreaRepository.getWaterAreaSeries({
      country,
      order,
    })
    const x: string[] = []
    const y: number[] = []
    for (const [, entry] of series.entries()) {
      x.push(entry.year)
      y.push(entry.sum)
    }
    return { x, series: [{ id: 'waterSurface', data: y }] }
  }
}

export { GetWaterAreaSeriesService }
