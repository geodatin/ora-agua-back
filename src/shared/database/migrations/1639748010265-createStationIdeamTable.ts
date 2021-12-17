import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createStationIdeamTable1639748010265
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'station_ideam',
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
            name: 'latitude',
            type: 'float',
          },
          {
            name: 'longitude',
            type: 'float',
          },
          {
            name: 'geometry',
            type: 'geometry',
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('station_ideam')
  }
}
