import { MigrationInterface, QueryRunner } from 'typeorm'

export class createDailyWaterLevelHybamTable1637795758735
  implements MigrationInterface
{
  name = 'createDailyWaterLevelHybamTable1637795758735'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS daily_water_level_hybam (
        station_code varchar,
        timestamp timestamp with time zone,
        quota_cm float,
        PRIMARY KEY (station_code, timestamp),
        FOREIGN KEY (station_code) REFERENCES station_hybam(code)
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('daily_water_level_hybam')
  }
}
