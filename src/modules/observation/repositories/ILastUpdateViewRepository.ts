export interface ILastUpdateViewRepository {
  getLastUpdate(): Promise<Date>
}
