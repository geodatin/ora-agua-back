interface IDailyWaterLevelHybamRepository {
  deleteAll(): Promise<void>
  insertFromCSV(filePath: string, header: string): Promise<void>
}

export { IDailyWaterLevelHybamRepository }
