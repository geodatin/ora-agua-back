import { IWaterAreaDTO } from '@modules/water/dtos/IWaterAreaDTO'
import { IWaterAreaRepository } from '@modules/water/repositories/IWaterAreaRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class AmazonicAreaService {
  constructor(
    @inject('WaterAreaRepository')
    private waterAreaRepository: IWaterAreaRepository
  ) {}

  async execute({ country, year }: IWaterAreaDTO) {
    return this.waterAreaRepository.getAmazonicArea({ country, year })
  }
}

export { AmazonicAreaService }
