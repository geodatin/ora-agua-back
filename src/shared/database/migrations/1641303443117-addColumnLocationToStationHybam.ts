import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class addColumnLocationToStationHybam1641303443117
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'station_hybam',
      new TableColumn({ name: 'location', type: 'geometry', isNullable: true })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('station_hybam', 'location')
  }
}
