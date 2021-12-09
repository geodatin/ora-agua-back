interface ISatelliteDerivedSedimentsHybamRepository {
  deleteAll(): Promise<void>
  insertFromCSV(filePath: string, header: string): Promise<void>
}

export { ISatelliteDerivedSedimentsHybamRepository }
