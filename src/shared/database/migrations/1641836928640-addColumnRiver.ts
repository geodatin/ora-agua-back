import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class addColumnRiver1641836928640 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'station_ideam',
      new TableColumn({ name: 'river', type: 'varchar', isNullable: true })
    )
    await queryRunner.addColumn(
      'station_sinca',
      new TableColumn({ name: 'river', type: 'varchar', isNullable: true })
    )
    await queryRunner.addColumn(
      'station_senhami',
      new TableColumn({ name: 'river', type: 'varchar', isNullable: true })
    )
    await queryRunner.addColumn(
      'station_senhami_pe',
      new TableColumn({ name: 'river', type: 'varchar', isNullable: true })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('station_ideam', 'river')
    await queryRunner.dropColumn('station_sinca', 'river')
    await queryRunner.dropColumn('station_senhami', 'river')
    await queryRunner.dropColumn('station_senhami_pe', 'river')
  }
}
