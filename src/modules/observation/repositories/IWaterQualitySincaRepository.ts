interface IWaterQualitySincaRepository {
  deleteAll(): Promise<void>
  insertFromCSV(filePath: string, header: string): Promise<void>
  getCount(): Promise<number>
}

export { IWaterQualitySincaRepository }
