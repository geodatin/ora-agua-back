import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateObservationSenhamiPe1641489273269
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'observation_senhami_pe',
        columns: [
          {
            name: 'station_code',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'timestamp',
            type: 'timestamp',
            isPrimary: true,
          },
          {
            name: 'temperature',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'relative_humidity',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'rain',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'level',
            type: 'double precision',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FKSenhamiObservationPeStation',
            referencedTableName: 'station_senhami_pe',
            referencedColumnNames: ['code'],
            columnNames: ['station_code'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('observation_senhami_pe')
  }
}
