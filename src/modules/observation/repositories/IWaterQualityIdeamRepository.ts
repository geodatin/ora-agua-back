import { ICreateWaterQualityIdeamDTO } from '../dtos/ICreateWaterQualityIdeamDTO'

interface IWaterQualityIdeamRepository {
  insertFromCSV(filePath: string, header: string): Promise<void>
  createMany(data: ICreateWaterQualityIdeamDTO[]): Promise<void>
}

export { IWaterQualityIdeamRepository }
