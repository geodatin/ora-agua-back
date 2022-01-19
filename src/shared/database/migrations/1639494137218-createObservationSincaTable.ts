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
            name: 'OD',
            type: 'float',
          },
          {
            name: 'electric_conductivity',
            type: 'float',
          },
          {
            name: 'turbidity',
            type: 'float',
          },
          {
            name: 'ph',
            type: 'float',
          },
          {
            name: 'sample_temperature',
            type: 'float',
          },
          {
            name: 'total_dissolved_solid',
            type: 'float',
          },
          {
            name: 'total_nitrogen',
            type: 'float',
          },
          {
            name: 'total_ortophosphate',
            type: 'float',
          },
          {
            name: 'total_suspension_solid',
            type: 'float',
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'station_sinca',
            referencedColumnNames: ['code'],
            columnNames: ['station_code'],
            onDelete: 'cascade',
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
