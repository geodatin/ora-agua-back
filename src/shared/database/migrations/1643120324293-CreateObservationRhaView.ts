import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateObservationRhaView1643120324293
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE MATERIALIZED VIEW observation_rha_view AS (
        SELECT observation.* FROM 
        (
            (
                SELECT station_code::varchar, o.timestamp, o.rain AS rain, o.flow_rate AS flow_rate, o.adopted_level AS level,
                'ANA' as responsible
                FROM observation_ana o 
                INNER JOIN station_view s ON s.code = o.station_code::varchar
            ) UNION
            (
                SELECT station_code::varchar, o.timestamp, o.rain_mm_d AS rain, o.flow_rate_mcs AS flow_rate, o.level_m AS level,
                'IDEAM' as responsible
                FROM observation_ideam o 
                INNER JOIN station_view s ON s.code = o.station_code::varchar
            ) UNION
            (
                SELECT station_code::varchar, o.timestamp, o.rain AS rain, null AS flow_rate, o.level AS level,
                'SENAMHI BOLÍVIA' as responsible
                FROM observation_senhami o 
                INNER JOIN station_view s ON s.code = o.station_code::varchar
            ) UNION
            (
                SELECT station_code::varchar, o.timestamp, o.rain AS rain, null AS flow_rate, o.level AS level,
                'SENAMHI PERU' as responsible
                FROM observation_senhami_pe o 
                INNER JOIN station_view s ON s.code = o.station_code::varchar
            )
        ) observation
            )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP MATERIALIZED VIEW observation_rha_view')
  }
}
