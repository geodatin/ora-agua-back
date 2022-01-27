import { ViewColumn, ViewEntity } from 'typeorm'

@ViewEntity({
  expression: `
      SELECT SUM(rain) rain, AVG(flow_rate) flow_rate, AVG(level) AS level, o.station_code, last_update,
      '1 HOUR' as interval
      FROM observation_rha_view o
      INNER JOIN (
      SELECT MAX(timestamp) AS last_update, station_code FROM observation_rha_view
      GROUP BY station_code
    ) o2 ON o.station_code = o2.station_code
      WHERE timestamp > (
          SELECT MAX(timestamp) FROM observation_rha_view 
      )- INTERVAL '1 HOUR' GROUP BY o.station_code, o2.last_update
    UNION
    SELECT SUM(rain) rain, AVG(flow_rate) flow_rate, AVG(level) AS level, o.station_code, last_update,
      '1 DAY' as interval
      FROM observation_rha_view o
      INNER JOIN (
      SELECT MAX(timestamp) AS last_update, station_code FROM observation_rha_view
      GROUP BY station_code
    ) o2 ON o.station_code = o2.station_code
      WHERE timestamp > (
          SELECT MAX(timestamp) FROM observation_rha_view 
      )- INTERVAL '1 DAY' GROUP BY o.station_code, o2.last_update
    UNION
    SELECT SUM(rain) rain, AVG(flow_rate) flow_rate, AVG(level) AS level, o.station_code, last_update,
      '1 WEEK' as interval
      FROM observation_rha_view o
      INNER JOIN (
      SELECT MAX(timestamp) AS last_update, station_code FROM observation_rha_view
      GROUP BY station_code
    ) o2 ON o.station_code = o2.station_code
      WHERE timestamp > (
          SELECT MAX(timestamp) FROM observation_rha_view 
      )- INTERVAL '1 WEEK' GROUP BY o.station_code, o2.last_update
    UNION
    SELECT SUM(rain) rain, AVG(flow_rate) flow_rate, AVG(level) AS level, o.station_code, last_update,
      '1 MONTH' as interval
      FROM observation_rha_view o
      INNER JOIN (
      SELECT MAX(timestamp) AS last_update, station_code FROM observation_rha_view
      GROUP BY station_code
    ) o2 ON o.station_code = o2.station_code
      WHERE timestamp > (
          SELECT MAX(timestamp) FROM observation_rha_view 
      )- INTERVAL '1 MONTH' GROUP BY o.station_code, o2.last_update
    UNION
    SELECT SUM(rain) rain, AVG(flow_rate) flow_rate, AVG(level) AS level, o.station_code, last_update,
      '3 MONTHS' as interval
      FROM observation_rha_view o
      INNER JOIN (
      SELECT MAX(timestamp) AS last_update, station_code FROM observation_rha_view
      GROUP BY station_code
    ) o2 ON o.station_code = o2.station_code
      WHERE timestamp > (
          SELECT MAX(timestamp) FROM observation_rha_view 
      )- INTERVAL '3 MONTHS' GROUP BY o.station_code, o2.last_update
    UNION
    SELECT SUM(rain) rain, AVG(flow_rate) flow_rate, AVG(level) AS level, o.station_code, last_update,
      '1 YEAR' as interval
      FROM observation_rha_view o
      INNER JOIN (
      SELECT MAX(timestamp) AS last_update, station_code FROM observation_rha_view
      GROUP BY station_code
    ) o2 ON o.station_code = o2.station_code
      WHERE timestamp > (
          SELECT MAX(timestamp) FROM observation_rha_view 
      )- INTERVAL '1 YEAR' GROUP BY o.station_code, o2.last_update`,
  materialized: true,
  name: 'last_observation_rha_view',
})
export class LastObservationRhaView {
  @ViewColumn()
  rain: number

  @ViewColumn({ name: 'flow_rate' })
  flowRate: number

  @ViewColumn()
  level: number

  @ViewColumn({ name: 'station_code' })
  stationCode: number

  @ViewColumn({ name: 'last_update' })
  lastUpdate: Date

  @ViewColumn()
  interval: string
}
