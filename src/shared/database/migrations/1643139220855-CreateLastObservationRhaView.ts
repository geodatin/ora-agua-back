import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateLastObservationRhaView1643139220855
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW last_observation_rha_view AS (
        SELECT SUM(rain) rain, AVG(flow_rate) flow_rate, AVG(level) AS level, o.station_code, last_update,
            'hour' as frequency
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
            'day' as frequency
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
            'week' as frequency
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
            'month' as frequency
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
            'quarter' as frequency
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
            'year' as frequency
            FROM observation_rha_view o
            INNER JOIN (
            SELECT MAX(timestamp) AS last_update, station_code FROM observation_rha_view
            GROUP BY station_code
        ) o2 ON o.station_code = o2.station_code
            WHERE timestamp > (
                SELECT MAX(timestamp) FROM observation_rha_view 
            )- INTERVAL '1 YEAR' GROUP BY o.station_code, o2.last_update
        )`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP MATERIALIZED VIEW last_observation_rha_view')
  }
}
