import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeViewDefinition1649362397957 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP MATERIALIZED VIEW IF EXISTS observation_rha_list_view'
    )
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW observation_rha_list_view AS (
        SELECT  
        (
            SELECT 
                rain AS rain 
            FROM 
                observation_rha_view 
            WHERE 
                station_code = s.code
            ORDER BY timestamp DESC
            LIMIT 1
        ) AS rain,
        (
            SELECT 
                flow_rate AS flow_rate 
            FROM 
                observation_rha_view 
            WHERE 
                station_code = s.code
            ORDER BY timestamp DESC
            LIMIT 1
        ) AS flow_rate,
        (
            SELECT 
                level AS level 
            FROM 
                observation_rha_view 
            WHERE 
                station_code = s.code
            ORDER BY timestamp DESC
            LIMIT 1
        ) AS level,
        code AS station_code,
        (
            SELECT 
                MAX(timestamp) AS last_update 
            FROM 
                observation_rha_view
            WHERE 
                station_code = s.code
        ) AS last_update,
        'last' AS frequency
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
                          observation_rha_view
                      WHERE 
                          station_code = s.code
                  ) AS last_update,
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
                          observation_rha_view
                      WHERE 
                          station_code = s.code
                  ) AS last_update,
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
                observation_rha_view
            WHERE 
                station_code = s.code
        ) AS last_update,
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
                observation_rha_view
            WHERE 
                station_code = s.code
        ) AS last_update,
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
                observation_rha_view
            WHERE 
                station_code = s.code
            ) AS last_update,
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
                          observation_rha_view
                      WHERE 
                          station_code = s.code
                  ) AS last_update,
          'year' AS frequency
          FROM station_view s 
            )`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP MATERIALIZED VIEW IF EXISTS observation_rha_list_view'
    )
  }
}
