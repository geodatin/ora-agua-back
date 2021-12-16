import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class alterTableObservationSincaDropColumn1639666392260
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('observation_sinca', 'parameter_id')
    await queryRunner.createPrimaryKey('observation_sinca', [
      'station_code',
      'timestamp',
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropPrimaryKey('observation_sinca')
    await queryRunner.addColumn(
      'observation_sinca',
      new TableColumn({ name: 'parameter_id', type: 'integer' })
    )
    await queryRunner.createPrimaryKey('observation_sinca', [
      'station_code',
      'timestamp',
      'parameter_id',
    ])
  }
}
