import { MigrationInterface, QueryRunner } from 'typeorm'

export class createSatelliteDerivedSedmentsHybamTable1637853770701
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS satellite_derived_sediments_hybam (
        station_code varchar,
        timestamp timestamp with time zone,
        concentration_mg_l float,
        range_concentration_max float,
        range_concentration_min float,
        PRIMARY KEY (station_code, timestamp),
        FOREIGN KEY (station_code) REFERENCES station_hybam(code)
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('satellite_derived_sediments_hybam')
  }
}
