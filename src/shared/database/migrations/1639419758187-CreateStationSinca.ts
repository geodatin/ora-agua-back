import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateStationSinca1639419758187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'station_sinca',
        columns: [
          {
            name: 'code',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'reference',
            type: 'varchar',
          },
          {
            name: 'height',
            type: 'float',
          },
          {
            name: 'latitude',
            type: 'float',
          },
          {
            name: 'longitude',
            type: 'float',
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('station_sinca')
  }
}
