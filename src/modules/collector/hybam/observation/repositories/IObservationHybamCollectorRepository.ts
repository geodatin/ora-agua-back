interface IObservationHybamCollectorRepository {
  deleteAll(): Promise<void>
  insertFromCSV(filePath: string, header: string): Promise<void>
  getLastObservation(): Promise<Array<{ code: string; date: Date }>>
}

export { IObservationHybamCollectorRepository }
