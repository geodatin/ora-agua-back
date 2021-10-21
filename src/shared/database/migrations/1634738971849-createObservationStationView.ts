import { MigrationInterface, QueryRunner } from 'typeorm'

export class createObservationStationView1634738971849
  implements MigrationInterface
{
  name = 'createObservationStationView1634738971849'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE MATERIALIZED VIEW "observation_station_view" AS SELECT name, type, o1.rain, o1.flow_rate "flowRate", o1.station_code AS code, 
  o1.adopted_level AS level, o1.timestamp
  FROM observation o1 INNER JOIN (
  SELECT MAX(timestamp) as timestamp, station_code FROM observation
      GROUP BY station_code
  ) o2 ON (o1.timestamp = o2.timestamp AND o1.station_code = o2.station_code) 
  INNER JOIN station s ON o1.station_code = s.code`)
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'MATERIALIZED_VIEW',
        'public',
        'observation_station_view',
        'SELECT name, type, o1.rain, o1.flow_rate "flowRate", o1.station_code AS code, \n  o1.adopted_level AS level, o1.timestamp\n  FROM observation o1 INNER JOIN (\n  SELECT MAX(timestamp) as timestamp, station_code FROM observation\n      GROUP BY station_code\n  ) o2 ON (o1.timestamp = o2.timestamp AND o1.station_code = o2.station_code) \n  INNER JOIN station s ON o1.station_code = s.code',
      ]
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "schema" = $2 AND "name" = $3`,
      ['MATERIALIZED_VIEW', 'public', 'observation_station_view']
    )
    await queryRunner.query(`DROP MATERIALIZED VIEW "observation_station_view"`)
  }
}
