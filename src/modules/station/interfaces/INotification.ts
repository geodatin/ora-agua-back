import { Point } from 'geojson'

export interface INotification {
  code: string
  name: string
  responsible: string
  location: Point
  value: number
  type: string
  situation: string
}
