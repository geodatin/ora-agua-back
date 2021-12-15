import { MigrationInterface, QueryRunner } from 'typeorm'

export class alterTableObservationSincaDropColumns1639590530366
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('observation_sinca', 'alert')
    await queryRunner.dropColumn('observation_sinca', 'class')
    await queryRunner.dropColumn('observation_sinca', 'trend')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE observation_sinca ADD COLUMN alert varchar;`
    )
    await queryRunner.query(
      `ALTER TABLE observation_sinca ADD COLUMN class varchar;`
    )
    await queryRunner.query(
      `ALTER TABLE observation_sinca ADD COLUMN trend varchar;`
    )
  }
}
