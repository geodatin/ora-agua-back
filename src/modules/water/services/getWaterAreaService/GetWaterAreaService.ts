import { IWaterAreaDTO } from '@modules/water/dtos/IWaterAreaDTO'
import { IWaterAreaRepository } from '@modules/water/repositories/IWaterAreaRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetWaterAreaService {
  constructor(
    @inject('WaterAreaRepository')
    private waterAreaRepository: IWaterAreaRepository
  ) {}

  async execute({ country, year }: IWaterAreaDTO) {
    return this.waterAreaRepository.getWaterArea({ country, year })
  }
}

export { GetWaterAreaService }
