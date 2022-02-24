import { ViewColumn, ViewEntity } from 'typeorm'

@ViewEntity({
  expression: `
    SELECT  
    (
        SELECT 
            AVG("OD") AS "OD" 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('hour', timestamp) 
        ORDER BY DATE_TRUNC('hour', timestamp) DESC 
        LIMIT 1
    ) AS "OD",
    (
        SELECT 
            AVG(electric_conductivity) AS electric_conductivity 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('hour', timestamp) 
        ORDER BY DATE_TRUNC('hour', timestamp) DESC 
        LIMIT 1
    ) AS electric_conductivity,
    (
        SELECT 
            AVG(turbidity) AS turbidity 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('hour', timestamp) 
        ORDER BY DATE_TRUNC('hour', timestamp) DESC 
        LIMIT 1
    ) AS turbidity,
    (
        SELECT 
            AVG(ph) AS ph 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('hour', timestamp) 
        ORDER BY DATE_TRUNC('hour', timestamp) DESC 
        LIMIT 1
    ) AS ph,
    (
        SELECT 
            AVG(sample_temperature) AS sample_temperature 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('hour', timestamp) 
        ORDER BY DATE_TRUNC('hour', timestamp) DESC 
        LIMIT 1
    ) AS sample_temperature,
    (
        SELECT 
            AVG(total_dissolved_solid) AS total_dissolved_solid 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('hour', timestamp) 
        ORDER BY DATE_TRUNC('hour', timestamp) DESC 
        LIMIT 1
    ) AS total_dissolved_solid,
    (
        SELECT 
            AVG(total_nitrogen) AS total_nitrogen 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('hour', timestamp) 
        ORDER BY DATE_TRUNC('hour', timestamp) DESC 
        LIMIT 1
    ) AS total_nitrogen,
    (
        SELECT 
            AVG(total_ortophosphate) AS total_ortophosphate 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('hour', timestamp) 
        ORDER BY DATE_TRUNC('hour', timestamp) DESC 
        LIMIT 1
    ) AS total_ortophosphate,
    (
        SELECT 
            AVG(total_suspension_solid) AS total_suspension_solid 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('hour', timestamp) 
        ORDER BY DATE_TRUNC('hour', timestamp) DESC 
        LIMIT 1
    ) AS total_suspension_solid,
    code AS station_code,
    (
        SELECT 
            MAX(timestamp) AS last_update 
        FROM 
            observation_rqa_view) AS last_update,
    'hour' AS frequency
    FROM station_view s 
    UNION
    SELECT  
    (
        SELECT 
            AVG("OD") AS "OD" 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('day', timestamp) 
        ORDER BY DATE_TRUNC('day', timestamp) DESC 
        LIMIT 1
    ) AS "OD",
    (
        SELECT 
            AVG(electric_conductivity) AS electric_conductivity 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('day', timestamp) 
        ORDER BY DATE_TRUNC('day', timestamp) DESC 
        LIMIT 1
    ) AS electric_conductivity,
    (
        SELECT 
            AVG(turbidity) AS turbidity 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('day', timestamp) 
        ORDER BY DATE_TRUNC('day', timestamp) DESC 
        LIMIT 1
    ) AS turbidity,
    (
        SELECT 
            AVG(ph) AS ph 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('day', timestamp) 
        ORDER BY DATE_TRUNC('day', timestamp) DESC 
        LIMIT 1
    ) AS ph,
    (
        SELECT 
            AVG(sample_temperature) AS sample_temperature 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('day', timestamp) 
        ORDER BY DATE_TRUNC('day', timestamp) DESC 
        LIMIT 1
    ) AS sample_temperature,
    (
        SELECT 
            AVG(total_dissolved_solid) AS total_dissolved_solid 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('day', timestamp) 
        ORDER BY DATE_TRUNC('day', timestamp) DESC 
        LIMIT 1
    ) AS total_dissolved_solid,
    (
        SELECT 
            AVG(total_nitrogen) AS total_nitrogen 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('day', timestamp) 
        ORDER BY DATE_TRUNC('day', timestamp) DESC 
        LIMIT 1
    ) AS total_nitrogen,
    (
        SELECT 
            AVG(total_ortophosphate) AS total_ortophosphate 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('day', timestamp) 
        ORDER BY DATE_TRUNC('day', timestamp) DESC 
        LIMIT 1
    ) AS total_ortophosphate,
    (
        SELECT 
            AVG(total_suspension_solid) AS total_suspension_solid 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('day', timestamp) 
        ORDER BY DATE_TRUNC('day', timestamp) DESC 
        LIMIT 1
    ) AS total_suspension_solid,
    code AS station_code,
    (
        SELECT 
            MAX(timestamp) AS last_update 
        FROM 
            observation_rqa_view) AS last_update,
    'day' AS frequency
    FROM station_view s 
    UNION
    SELECT  
    (
        SELECT 
            AVG("OD") AS "OD" 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('week', timestamp) 
        ORDER BY DATE_TRUNC('week', timestamp) DESC 
        LIMIT 1
    ) AS "OD",
    (
        SELECT 
            AVG(electric_conductivity) AS electric_conductivity 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('week', timestamp) 
        ORDER BY DATE_TRUNC('week', timestamp) DESC 
        LIMIT 1
    ) AS electric_conductivity,
    (
        SELECT 
            AVG(turbidity) AS turbidity 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('week', timestamp) 
        ORDER BY DATE_TRUNC('week', timestamp) DESC 
        LIMIT 1
    ) AS turbidity,
    (
        SELECT 
            AVG(ph) AS ph 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('week', timestamp) 
        ORDER BY DATE_TRUNC('week', timestamp) DESC 
        LIMIT 1
    ) AS ph,
    (
        SELECT 
            AVG(sample_temperature) AS sample_temperature 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('week', timestamp) 
        ORDER BY DATE_TRUNC('week', timestamp) DESC 
        LIMIT 1
    ) AS sample_temperature,
    (
        SELECT 
            AVG(total_dissolved_solid) AS total_dissolved_solid 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('week', timestamp) 
        ORDER BY DATE_TRUNC('week', timestamp) DESC 
        LIMIT 1
    ) AS total_dissolved_solid,
    (
        SELECT 
            AVG(total_nitrogen) AS total_nitrogen 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('week', timestamp) 
        ORDER BY DATE_TRUNC('week', timestamp) DESC 
        LIMIT 1
    ) AS total_nitrogen,
    (
        SELECT 
            AVG(total_ortophosphate) AS total_ortophosphate 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('week', timestamp) 
        ORDER BY DATE_TRUNC('week', timestamp) DESC 
        LIMIT 1
    ) AS total_ortophosphate,
    (
        SELECT 
            AVG(total_suspension_solid) AS total_suspension_solid 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('week', timestamp) 
        ORDER BY DATE_TRUNC('week', timestamp) DESC 
        LIMIT 1
    ) AS total_suspension_solid,
    code AS station_code,
    (
        SELECT 
            MAX(timestamp) AS last_update 
        FROM 
            observation_rqa_view) AS last_update,
    'week' AS frequency
    FROM station_view s 
    UNION
    SELECT  
    (
        SELECT 
            AVG("OD") AS "OD" 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('month', timestamp) 
        ORDER BY DATE_TRUNC('month', timestamp) DESC 
        LIMIT 1
    ) AS "OD",
    (
        SELECT 
            AVG(electric_conductivity) AS electric_conductivity 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('month', timestamp) 
        ORDER BY DATE_TRUNC('month', timestamp) DESC 
        LIMIT 1
    ) AS electric_conductivity,
    (
        SELECT 
            AVG(turbidity) AS turbidity 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('month', timestamp) 
        ORDER BY DATE_TRUNC('month', timestamp) DESC 
        LIMIT 1
    ) AS turbidity,
    (
        SELECT 
            AVG(ph) AS ph 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('month', timestamp) 
        ORDER BY DATE_TRUNC('month', timestamp) DESC 
        LIMIT 1
    ) AS ph,
    (
        SELECT 
            AVG(sample_temperature) AS sample_temperature 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('month', timestamp) 
        ORDER BY DATE_TRUNC('month', timestamp) DESC 
        LIMIT 1
    ) AS sample_temperature,
    (
        SELECT 
            AVG(total_dissolved_solid) AS total_dissolved_solid 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('month', timestamp) 
        ORDER BY DATE_TRUNC('month', timestamp) DESC 
        LIMIT 1
    ) AS total_dissolved_solid,
    (
        SELECT 
            AVG(total_nitrogen) AS total_nitrogen 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('month', timestamp) 
        ORDER BY DATE_TRUNC('month', timestamp) DESC 
        LIMIT 1
    ) AS total_nitrogen,
    (
        SELECT 
            AVG(total_ortophosphate) AS total_ortophosphate 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('month', timestamp) 
        ORDER BY DATE_TRUNC('month', timestamp) DESC 
        LIMIT 1
    ) AS total_ortophosphate,
    (
        SELECT 
            AVG(total_suspension_solid) AS total_suspension_solid 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('month', timestamp) 
        ORDER BY DATE_TRUNC('month', timestamp) DESC 
        LIMIT 1
    ) AS total_suspension_solid,
    code AS station_code,
    (
        SELECT 
            MAX(timestamp) AS last_update 
        FROM 
            observation_rqa_view) AS last_update,
    'month' AS frequency
    FROM station_view s 
    UNION
    SELECT  
    (
        SELECT 
            AVG("OD") AS "OD" 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('quarter', timestamp) 
        ORDER BY DATE_TRUNC('quarter', timestamp) DESC 
        LIMIT 1
    ) AS "OD",
    (
        SELECT 
            AVG(electric_conductivity) AS electric_conductivity 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('quarter', timestamp) 
        ORDER BY DATE_TRUNC('quarter', timestamp) DESC 
        LIMIT 1
    ) AS electric_conductivity,
    (
        SELECT 
            AVG(turbidity) AS turbidity 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('quarter', timestamp) 
        ORDER BY DATE_TRUNC('quarter', timestamp) DESC 
        LIMIT 1
    ) AS turbidity,
    (
        SELECT 
            AVG(ph) AS ph 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('quarter', timestamp) 
        ORDER BY DATE_TRUNC('quarter', timestamp) DESC 
        LIMIT 1
    ) AS ph,
    (
        SELECT 
            AVG(sample_temperature) AS sample_temperature 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('quarter', timestamp) 
        ORDER BY DATE_TRUNC('quarter', timestamp) DESC 
        LIMIT 1
    ) AS sample_temperature,
    (
        SELECT 
            AVG(total_dissolved_solid) AS total_dissolved_solid 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('quarter', timestamp) 
        ORDER BY DATE_TRUNC('quarter', timestamp) DESC 
        LIMIT 1
    ) AS total_dissolved_solid,
    (
        SELECT 
            AVG(total_nitrogen) AS total_nitrogen 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('quarter', timestamp) 
        ORDER BY DATE_TRUNC('quarter', timestamp) DESC 
        LIMIT 1
    ) AS total_nitrogen,
    (
        SELECT 
            AVG(total_ortophosphate) AS total_ortophosphate 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('quarter', timestamp) 
        ORDER BY DATE_TRUNC('quarter', timestamp) DESC 
        LIMIT 1
    ) AS total_ortophosphate,
    (
        SELECT 
            AVG(total_suspension_solid) AS total_suspension_solid 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('quarter', timestamp) 
        ORDER BY DATE_TRUNC('quarter', timestamp) DESC 
        LIMIT 1
    ) AS total_suspension_solid,
    code AS station_code,
    (
        SELECT 
            MAX(timestamp) AS last_update 
        FROM 
            observation_rqa_view) AS last_update,
    'quarter' AS frequency
    FROM station_view s 
    UNION
    SELECT  
    (
        SELECT 
            AVG("OD") AS "OD" 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('year', timestamp) 
        ORDER BY DATE_TRUNC('year', timestamp) DESC 
        LIMIT 1
    ) AS "OD",
    (
        SELECT 
            AVG(electric_conductivity) AS electric_conductivity 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('year', timestamp) 
        ORDER BY DATE_TRUNC('year', timestamp) DESC 
        LIMIT 1
    ) AS electric_conductivity,
    (
        SELECT 
            AVG(turbidity) AS turbidity 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('year', timestamp) 
        ORDER BY DATE_TRUNC('year', timestamp) DESC 
        LIMIT 1
    ) AS turbidity,
    (
        SELECT 
            AVG(ph) AS ph 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('year', timestamp) 
        ORDER BY DATE_TRUNC('year', timestamp) DESC 
        LIMIT 1
    ) AS ph,
    (
        SELECT 
            AVG(sample_temperature) AS sample_temperature 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('year', timestamp) 
        ORDER BY DATE_TRUNC('year', timestamp) DESC 
        LIMIT 1
    ) AS sample_temperature,
    (
        SELECT 
            AVG(total_dissolved_solid) AS total_dissolved_solid 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('year', timestamp) 
        ORDER BY DATE_TRUNC('year', timestamp) DESC 
        LIMIT 1
    ) AS total_dissolved_solid,
    (
        SELECT 
            AVG(total_nitrogen) AS total_nitrogen 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('year', timestamp) 
        ORDER BY DATE_TRUNC('year', timestamp) DESC 
        LIMIT 1
    ) AS total_nitrogen,
    (
        SELECT 
            AVG(total_ortophosphate) AS total_ortophosphate 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('year', timestamp) 
        ORDER BY DATE_TRUNC('year', timestamp) DESC 
        LIMIT 1
    ) AS total_ortophosphate,
    (
        SELECT 
            AVG(total_suspension_solid) AS total_suspension_solid 
        FROM 
            observation_rqa_view 
        WHERE 
            station_code = s.code
        GROUP BY DATE_TRUNC('year', timestamp) 
        ORDER BY DATE_TRUNC('year', timestamp) DESC 
        LIMIT 1
    ) AS total_suspension_solid,
    code AS station_code,
    (
        SELECT 
            MAX(timestamp) AS last_update 
        FROM 
            observation_rqa_view) AS last_update,
    'year' AS frequency
    FROM station_view s `,
  materialized: true,
  name: 'last_observation_rqa_view',
})
export class LastObservationRqaView {
  @ViewColumn()
  OD: number

  @ViewColumn({ name: 'electric_conductivity' })
  electricConductivity: number

  @ViewColumn()
  turbidity: number

  @ViewColumn()
  ph: number

  @ViewColumn({ name: 'sample_temperature' })
  sampleTemperature: number

  @ViewColumn({ name: 'total_dissolved_solid' })
  totalDissolvedSolid: number

  @ViewColumn({ name: 'total_nitrogen' })
  totalNitrogen: number

  @ViewColumn({ name: 'total_ortophosphate' })
  totalOrtophosphate: number

  @ViewColumn({ name: 'total_suspension_solid' })
  totalSuspensionSolid: number

  @ViewColumn({ name: 'station_code' })
  stationCode: string

  @ViewColumn({ name: 'last_update' })
  lastUpdate: Date

  @ViewColumn()
  interval: string
}