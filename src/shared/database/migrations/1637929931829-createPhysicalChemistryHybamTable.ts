import { MigrationInterface, QueryRunner } from 'typeorm'

export class createPhysicalChemistryHybamTable1637929931829
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS physical_chemistry_hybam (
        station_code varchar,
        timestamp timestamp with time zone,
        temperature_c float,
        conductivity_us float,
        ph float,
        PRIMARY KEY (station_code, timestamp),
        FOREIGN KEY (station_code) REFERENCES station_hybam(code) ON DELETE CASCADE
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('physical_chemistry_hybam')
  }
}
