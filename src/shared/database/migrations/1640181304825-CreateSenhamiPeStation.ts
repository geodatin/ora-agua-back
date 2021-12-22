import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSenhamiPeStation1640181304825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'station_senhami_pe',
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
            name: 'location',
            type: 'geometry',
          },
          {
            name: 'old_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'cate',
            type: 'varchar',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('station_senhami_pe')
  }
}
