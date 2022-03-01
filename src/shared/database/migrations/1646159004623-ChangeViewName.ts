import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeViewName1646159004623 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER MATERIALIZED VIEW last_observation_rha_view RENAME TO observation_rha_list_view'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER MATERIALIZED VIEW observation_rha_list_view RENAME TO last_observation_rha_view'
    )
  }
}
