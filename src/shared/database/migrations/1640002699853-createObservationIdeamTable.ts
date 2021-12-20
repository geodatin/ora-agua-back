import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createObservationIdeamTable1640002699853
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'observation_ideam',
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
            name: 'level_m',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'rain_mm_d',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'flow_rate_mcs',
            type: 'double precision',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FKStationIdeam',
            columnNames: ['station_code'],
            referencedColumnNames: ['code'],
            referencedTableName: 'station_ideam',
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('observation_ideam')
  }
}
