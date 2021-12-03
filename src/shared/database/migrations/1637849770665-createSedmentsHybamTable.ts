import { MigrationInterface, QueryRunner } from 'typeorm'

export class createSedmentsHybamTable1637849770665
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS sediments_hybam (
        station_code varchar,
        timestamp timestamp with time zone,
        concentration_mg_l float,
        PRIMARY KEY (station_code, timestamp),
        FOREIGN KEY (station_code) REFERENCES station_hybam(code)
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sediments_hybam')
  }
}
