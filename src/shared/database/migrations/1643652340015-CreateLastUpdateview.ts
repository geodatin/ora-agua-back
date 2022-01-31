import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateLastUpdateview1643652340015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW last_update_view AS (SELECT NOW() AS last_update)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP MATERIALIZED VIEW last_update_view')
  }
}
