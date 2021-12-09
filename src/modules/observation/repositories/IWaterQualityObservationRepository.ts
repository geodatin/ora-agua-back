interface IWaterQualityObservationRepository {
  createMany(data: any): Promise<void>
}
export { IWaterQualityObservationRepository }
