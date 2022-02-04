import { Point } from 'geojson'

export interface INotification {
  code: string
  name: string
  location: Point
  value: number
  type: string
  situation: string
}
