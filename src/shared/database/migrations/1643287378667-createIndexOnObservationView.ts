import { MigrationInterface, QueryRunner } from 'typeorm'

export class createIndexOnObservationView1643287378667
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE INDEX observation_view_code_idx ON observation_rha_view(station_code)'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX observation_view_code_idx')
  }
}
