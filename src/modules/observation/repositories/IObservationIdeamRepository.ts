interface IObservationIdeamRepository {
  insertFromCSV(filePath: string, header: string): Promise<void>
  getLastObservation(): Promise<{ code: string; date: Date }[]>
}

export { IObservationIdeamRepository }
