import { IWaterAreaRepository } from '@modules/water/repositories/IWaterAreaRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetWaterAreaSeriesService {
  constructor(
    @inject('WaterAreaRepository')
    private waterAreaRepository: IWaterAreaRepository
  ) {}

  async execute() {
    const result = await this.waterAreaRepository.getWaterAreaSeries()
    const x = new Set()
    const series: { id: string; data: number[] }[] = []
    const names = new Set()
    for (const [, entry] of result.entries()) {
      if (names.has(entry.name)) {
        const index = series.findIndex((series) => series.id === entry.name)
        series[index].data.push(entry.sum)
      } else {
        names.add(entry.name)
        series.push({
          id: entry.name,
          data: [entry.sum],
        })
      }
      x.add(entry.year)
    }
    return { x: Array.from(x), series: series }
  }
}

export { GetWaterAreaSeriesService }
