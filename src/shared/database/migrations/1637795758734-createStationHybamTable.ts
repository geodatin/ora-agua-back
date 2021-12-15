import { MigrationInterface, QueryRunner } from 'typeorm'

export class createStationHybamTable1637795758734
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS station_hybam (
        code varchar,
        name varchar,
        type varchar,
        river varchar,
        grand_basin varchar,
        basin varchar,
        latitude float,
        longitude float,
        PRIMARY KEY (code)
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('station_hybam')
  }
}
