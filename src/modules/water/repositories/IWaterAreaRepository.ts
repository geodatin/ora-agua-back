import { IWaterAreaDTO } from '../dtos/IWaterAreaDTO'

interface IWaterAreaRepository {
  getTotalWaterArea({ country, year }: IWaterAreaDTO): Promise<number>
}

export { IWaterAreaRepository }
