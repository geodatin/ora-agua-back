import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateLastObservationRhaView1643139220855
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW last_observation_rha_view AS (
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
                )- INTERVAL '1 YEAR' GROUP BY o.station_code, o2.last_update
        )`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP MATERIALIZED VIEW last_observation_rha_view')
  }
}
