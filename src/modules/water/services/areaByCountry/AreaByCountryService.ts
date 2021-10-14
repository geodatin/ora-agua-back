import { IWaterAreaDTO } from '@modules/water/dtos/IWaterAreaDTO'
import { IWaterAreaRepository } from '@modules/water/repositories/IWaterAreaRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class AreaByCountryService {
  constructor(
    @inject('WaterAreaRepository')
    private waterAreaRepository: IWaterAreaRepository
  ) {}

  async execute({ year }: IWaterAreaDTO) {
    const result = await this.waterAreaRepository.getAreaByCountry({ year })
    const series: { id: string; y: number }[] = []
    for (const element of result) {
      series.push({ id: element.name, y: element.sum })
    }
    return series
  }
}

export { AreaByCountryService }
