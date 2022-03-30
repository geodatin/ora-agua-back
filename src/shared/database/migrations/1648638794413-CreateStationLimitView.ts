import { MigrationInterface, QueryRunner } from 'typeorm'
import { View } from 'typeorm/schema-builder/view/View'

export class CreateStationLimitView1648638794413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createView(
      new View({
        expression: `
        SELECT (
            SELECT MAX(value) AS flow_rate_inferior_limit
            FROM (
                  SELECT flow_rate AS value, PERCENT_RANK() 
                      OVER (ORDER BY flow_rate) AS percentage 
                      FROM observation_rha_view observation 
                      WHERE flow_rate IS NOT NULL AND flow_rate != 0 AND station_code = s.code
                  ) t1 
              WHERE percentage < 0.1
        ) AS flow_rate_inferior_limit,
        (
            SELECT MIN(value) AS flow_rate_superior_limit
            FROM (
                  SELECT flow_rate AS value, PERCENT_RANK() 
                      OVER (ORDER BY flow_rate) AS percentage 
                      FROM observation_rha_view observation 
                      WHERE flow_rate IS NOT NULL AND flow_rate != 0 AND station_code = s.code
                  ) t1 
              WHERE percentage > 0.9
        ) AS flow_rate_superior_limit,
          (
            SELECT MAX(value) AS level_inferior_limit
            FROM (
                  SELECT level AS value, PERCENT_RANK() 
                      OVER (ORDER BY level) AS percentage 
                      FROM observation_rha_view observation 
                      WHERE level IS NOT NULL AND level != 0 AND station_code = s.code
                  ) t1 
              WHERE percentage < 0.1
        ) AS level_inferior_limit,
        (
            SELECT MIN(value) AS level_superior_limit
            FROM (
                  SELECT level AS value, PERCENT_RANK() 
                      OVER (ORDER BY level) AS percentage 
                      FROM observation_rha_view observation 
                      WHERE level IS NOT NULL AND level != 0 AND station_code = s.code
                  ) t1 
              WHERE percentage > 0.9
        ) AS level_superior_limit,
        code AS station_code
        FROM station_view s
        GROUP BY station_code
        ORDER BY station_code
              `,
        name: 'station_limit_view',
        materialized: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropView('station_limit_view')
  }
}
