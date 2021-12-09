import { ViewColumn, ViewEntity } from 'typeorm'

@ViewEntity({
  expression: `SELECT ST_AsGeoJSON(location)::json as location, name, type, o1.rain, o1.flow_rate "flowRate", o1.station_code AS code, 
  o1.adopted_level AS level, o1.timestamp
  FROM observation o1 INNER JOIN (
  SELECT MAX(timestamp) as timestamp, station_code FROM observation
      GROUP BY station_code
  ) o2 ON (o1.timestamp = o2.timestamp AND o1.station_code = o2.station_code) 
  INNER JOIN station s ON o1.station_code = s.code`,
  materialized: true,
  name: 'observation_station_view',
})
class ObservationStationView {
  @ViewColumn()
  location: string

  @ViewColumn()
  name: string

  @ViewColumn()
  type: string

  @ViewColumn()
  rain: number

  @ViewColumn({ name: 'flow_rate' })
  flowRate: number

  @ViewColumn()
  code: number

  @ViewColumn()
  level: number

  @ViewColumn()
  timestamp: Date
}

export { ObservationStationView }
