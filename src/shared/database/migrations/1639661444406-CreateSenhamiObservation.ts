import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSenhamiObservation1639661444406
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'observation_senhami',
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
          },
          {
            name: 'speed',
            type: 'double precision',
          },
          {
            name: 'relative_humidity',
            type: 'double precision',
          },
          {
            name: 'rain',
            type: 'double precision',
          },
          {
            name: 'pressure',
            type: 'double precision',
          },
          {
            name: 'level',
            type: 'double precision',
          },
        ],
        foreignKeys: [
          {
            name: 'FKSenhamiObservationStation',
            referencedTableName: 'station_senhami',
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
    await queryRunner.dropTable('observation_senhami')
  }
}
