import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateObservationHybamTable1646160365517
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'observation_hybam',
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
            name: 'electric_conductivity',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'ph',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'temperature',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'total_ortophosphate',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'level',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'flow_rate',
            type: 'float',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'station_hybam',
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
    await queryRunner.dropTable('observation_hybam')
  }
}
