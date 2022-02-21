import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateIndexOnObservationRqaView1645450562232
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE INDEX observation_rqa_view_code_idx ON observation_rqa_view(station_code)'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX observation_rqa_view_code_idx')
  }
}
