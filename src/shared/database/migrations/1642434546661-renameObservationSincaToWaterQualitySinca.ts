import { MigrationInterface, QueryRunner } from 'typeorm'

export class renameObservationSincaToWaterQualitySinca1642434546661
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('observation_sinca', 'water_quality_sinca')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('water_quality_sinca', 'observation_sinca')
  }
}
