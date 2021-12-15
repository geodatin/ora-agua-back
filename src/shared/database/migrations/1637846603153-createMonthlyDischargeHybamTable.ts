import { MigrationInterface, QueryRunner } from 'typeorm'

export class createDailyDischargeHybamTable1637846310659
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS monthly_discharge_hybam (
        station_code varchar,
        timestamp timestamp with time zone,
        discharge_m3_s float,
        PRIMARY KEY (station_code, timestamp),
        FOREIGN KEY (station_code) REFERENCES station_hybam(code)
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('monthly_discharge_hybam')
  }
}
