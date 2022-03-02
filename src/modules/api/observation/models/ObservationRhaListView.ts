import { ViewColumn, ViewEntity } from 'typeorm'

@ViewEntity({
  expression: `
  SELECT  
  (
      SELECT 
          SUM(rain) AS rain 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('hour', timestamp) 
      ORDER BY DATE_TRUNC('hour', timestamp) DESC 
      LIMIT 1
  ) AS rain,
  (
      SELECT 
          AVG(flow_rate) AS flow_rate 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('hour', timestamp) 
      ORDER BY DATE_TRUNC('hour', timestamp) DESC 
      LIMIT 1
  ) AS flow_rate,
  (
      SELECT 
          AVG(level) AS level 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('hour', timestamp) 
      ORDER BY DATE_TRUNC('hour', timestamp) DESC 
      LIMIT 1
  ) AS level,
  code AS station_code,
  (
      SELECT 
           MAX(timestamp) AS last_update 
       FROM 
          observation_rha_view) AS last_update,
  'hour' AS frequency
  FROM station_view s 
  UNION
  SELECT  
  (
      SELECT 
          SUM(rain) AS rain 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('day', timestamp) 
      ORDER BY DATE_TRUNC('day', timestamp) DESC 
      LIMIT 1
  ) AS rain,
  (
      SELECT 
          AVG(flow_rate) AS flow_rate 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('day', timestamp) 
      ORDER BY DATE_TRUNC('day', timestamp) DESC 
      LIMIT 1
  ) AS flow_rate,
  (
      SELECT 
          AVG(level) AS level 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('day', timestamp) 
      ORDER BY DATE_TRUNC('day', timestamp) DESC 
      LIMIT 1
  ) AS level,
  code AS station_code,
  (
      SELECT 
           MAX(timestamp) AS last_update 
       FROM 
          observation_rha_view) AS last_update,
  'day' AS frequency
  FROM station_view s 
  UNION
  SELECT  
  (
      SELECT 
          SUM(rain) AS rain 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('week', timestamp) 
      ORDER BY DATE_TRUNC('week', timestamp) DESC 
      LIMIT 1
  ) AS rain,
  (
      SELECT 
          AVG(flow_rate) AS flow_rate 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('week', timestamp) 
      ORDER BY DATE_TRUNC('week', timestamp) DESC 
      LIMIT 1
  ) AS flow_rate,
  (
      SELECT 
          AVG(level) AS level 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('week', timestamp) 
      ORDER BY DATE_TRUNC('week', timestamp) DESC 
      LIMIT 1
  ) AS level,
  code AS station_code,
  (
      SELECT 
           MAX(timestamp) AS last_update 
       FROM 
          observation_rha_view) AS last_update,
  'week' AS frequency
  FROM station_view s 
  UNION
  SELECT  
  (
      SELECT 
          SUM(rain) AS rain 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('month', timestamp) 
      ORDER BY DATE_TRUNC('month', timestamp) DESC 
      LIMIT 1
  ) AS rain,
  (
      SELECT 
          AVG(flow_rate) AS flow_rate 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('month', timestamp) 
      ORDER BY DATE_TRUNC('month', timestamp) DESC 
      LIMIT 1
  ) AS flow_rate,
  (
      SELECT 
          AVG(level) AS level 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('month', timestamp) 
      ORDER BY DATE_TRUNC('month', timestamp) DESC 
      LIMIT 1
  ) AS level,
  code AS station_code,
  (
      SELECT 
           MAX(timestamp) AS last_update 
       FROM 
          observation_rha_view) AS last_update,
  'month' AS frequency
  FROM station_view s 
  UNION
  SELECT  
  (
      SELECT 
          SUM(rain) AS rain 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('quarter', timestamp) 
      ORDER BY DATE_TRUNC('quarter', timestamp) DESC 
      LIMIT 1
  ) AS rain,
  (
      SELECT 
          AVG(flow_rate) AS flow_rate 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('quarter', timestamp) 
      ORDER BY DATE_TRUNC('quarter', timestamp) DESC 
      LIMIT 1
  ) AS flow_rate,
  (
      SELECT 
          AVG(level) AS level 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('quarter', timestamp) 
      ORDER BY DATE_TRUNC('quarter', timestamp) DESC 
      LIMIT 1
  ) AS level,
  code AS station_code,
  (
      SELECT 
           MAX(timestamp) AS last_update 
       FROM 
          observation_rha_view) AS last_update,
  'quarter' AS frequency
  FROM station_view s 
  UNION
  SELECT  
  (
      SELECT 
          SUM(rain) AS rain 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('year', timestamp) 
      ORDER BY DATE_TRUNC('year', timestamp) DESC 
      LIMIT 1
  ) AS rain,
  (
      SELECT 
          AVG(flow_rate) AS flow_rate 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('year', timestamp) 
      ORDER BY DATE_TRUNC('year', timestamp) DESC 
      LIMIT 1
  ) AS flow_rate,
  (
      SELECT 
          AVG(level) AS level 
      FROM 
          observation_rha_view 
      WHERE 
          station_code = s.code
      GROUP BY DATE_TRUNC('year', timestamp) 
      ORDER BY DATE_TRUNC('year', timestamp) DESC 
      LIMIT 1
  ) AS level,
  code AS station_code,
  (
      SELECT 
           MAX(timestamp) AS last_update 
       FROM 
          observation_rha_view) AS last_update,
  'year' AS frequency
  FROM station_view s`,
  materialized: true,
  name: 'observation_rha_list_view',
  schema: process.env.SCHEMA,
})
export class ObservationRhaListView {
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
