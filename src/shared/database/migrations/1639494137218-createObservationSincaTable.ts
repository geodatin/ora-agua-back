import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createObservationSincaTable1639494137218
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'observation_sinca',
        columns: [
          {
            name: 'station_code',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'timestamp',
            type: 'timestamptz',
            isPrimary: true,
          },
          {
            name: 'parameter_id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'latitude',
            type: 'float',
          },
          {
            name: 'longitude',
            type: 'float',
          },
          {
            name: 'value',
            type: 'float',
          },
          {
            name: 'alert',
            type: 'varchar',
          },
          {
            name: 'trend',
            type: 'varchar',
          },
          {
            name: 'class',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'station_sinca',
            referencedColumnNames: ['code'],
            columnNames: ['station_code'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('observation_sinca')
  }
}
