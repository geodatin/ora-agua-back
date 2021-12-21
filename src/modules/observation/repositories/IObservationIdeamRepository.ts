interface IObservationIdeamRepository {
  insertFromCSV(filePath: string, header: string): Promise<void>
  getLastObservation(stationCode: string): Promise<Date>
}

export { IObservationIdeamRepository }
