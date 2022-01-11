import { MigrationInterface, QueryRunner } from 'typeorm'

export class createStationMaterializedView1641842498907
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE MATERIALIZED VIEW station_view AS (
      select stations.*, countries.name as country
      from
      (
        (select code, name, type, river, location, 'hybam' as responsible from station_hybam)
        UNION
        (select code::varchar, name, type, river,  location, responsible from station_ana)
        UNION
        (select code, name, null as type, river, geometry as location, 'ideam' as responsible from station_ideam)
        UNION
        (select code, name, null as type, river, geometry as location, 'sinca' as responsible from station_sinca)
        UNION
        (select code, name, null as type, river, location, 'senhami' as responsible from station_senhami)
        UNION
        (select code, name, type, river, location, 'senhami' as responsible from station_senhami_pe)
      ) as stations,
        south_america_country as countries
      where ST_Contains(countries.geometry, stations.location)
    )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropView('station_view')
  }
}
