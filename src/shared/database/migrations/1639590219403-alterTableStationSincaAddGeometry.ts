import { MigrationInterface, QueryRunner } from 'typeorm'

export class alterTableStationSincaAddGeometry1639590219403
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE station_sinca ADD COLUMN geometry geometry;`
    )
    await queryRunner.query(
      `UPDATE station_sinca SET geometry = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('station_sinca', 'geometry')
  }
}
