import { MigrationInterface, QueryRunner } from 'typeorm'

export class createStationMaterializedView1641842498907
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE MATERIALIZED VIEW station_view AS (
      select stations.*, countries.name as country, countries.id as country_id
      from
      (
        (
          select code, name, type, river, location, 'HYBAM' as responsible, 'HYBAM' as network 
          from station_hybam
        )
        UNION
        (
          select s.code::varchar, s.name, s.type, s.river, s.location, 'ANA' as responsible, s.network_type as network
          from station_ana s, pontos_de_interesse p
          where (ST_Intersects(p.geom, s.location) or p.id = s.code::varchar) and p.id is not null and s.network_type = 'RHA'
        )
        UNION
        (
          select code, name, null as type, river, geometry as location, 'IDEAM' as responsible, 'RHA' as network
          from station_ideam s, pontos_de_interesse p
          where (ST_Intersects(p.geom, s.geometry) or p.id = s.code) and p.id is not null
        )
        UNION
        (
          select code, name, null as type, river, location, 'SENHAMI' as responsible, 'RHA' as network 
          from station_senhami s, pontos_de_interesse p
          where (ST_Intersects(p.geom, s.location) or p.id = s.code) and p.id is not null
        )
        UNION
        (
          select code, name, type, river, location, 'SENHAMI' as responsible, 'RHA' as network
          from station_senhami_pe s, pontos_de_interesse p
          where (ST_Intersects(p.geom, s.location) or p.id = s.code) and p.id is not null
        )
        UNION
        (
          select s.code::varchar, s.name, s.type, s.river, s.location, 'ANA' as responsible, s.network_type as network
          from station_ana s, rrmca_general r
          where ST_Intersects(r.geom, s.location) and s.network_type = 'RQA'
        )
        UNION
        (
          select code, name, null as type, river, geometry as location, 'IDEAM' as responsible, 'RQA' as network
          from station_ideam s, rrmca_general r
          where ST_Intersects(r.geom, s.geometry)
        )
        UNION
        (
          select code, name, null as type, river, geometry as location, 'SINCA' as responsible, 'RQA' as network
          from station_sinca s, rrmca_general r
          where ST_Intersects(r.geom, s.geometry)
        )
      ) as stations,
      south_america_country as countries
      where ST_Contains(countries.geometry, stations.location)
    )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP MATERIALIZED VIEW station_view')
  }
}
