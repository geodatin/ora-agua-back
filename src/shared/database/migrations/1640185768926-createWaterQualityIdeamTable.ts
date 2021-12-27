import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createWaterQualityIdeamTable1640185768926
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'water_quality_ideam',
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
            name: 'OD',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'electric_conductivity',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'turbidity',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'ph',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'rain',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'depth',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'sample_temperature',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'total_dissolved_solid',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'total_nitrogen',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'total_ortophosphate',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'total_suspension_solid',
            type: 'float',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FKQualityStationIdeam',
            columnNames: ['station_code'],
            referencedColumnNames: ['code'],
            referencedTableName: 'station_ideam',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('water_quality_ideam')
  }
}
