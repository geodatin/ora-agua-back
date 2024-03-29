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
          select 
            s.code, 
            INITCAP(s.name) as name, 
            s.type, 
            INITCAP(s.river) as river, 
            s.location, 
            'HYBAM' as responsible, 
            'HYBAM' as network,
            EXISTS(select 1 from physical_chemistry_hybam p where p.ph is not null and p.station_code = s.code) as ph,
            false as "OD",
            EXISTS(select 1 from physical_chemistry_hybam p where p.conductivity_us is not null and p.station_code = s.code) as electric_conductivity,
            false as turbidity,
            EXISTS(select 1 from physical_chemistry_hybam p where p.temperature_c is not null and p.station_code = s.code) as sample_temperature,
            false as total_dissolved_solid,
            false as total_nitrogen,
            EXISTS(select 1 from geochemistry_hybam g where g.po4_mg_l is not null and g.station_code = s.code) as total_ortophosphate,
            false as total_suspension_solid,
            false as rain,
            EXISTS(select 1 from daily_discharge_hybam d where d.discharge_m3_s is not null and d.station_code = s.code) as flow_rate,
            EXISTS(select 1 from daily_water_level_hybam l where l.quota_cm is not null and l.station_code = s.code) as adopted_level
          from station_hybam s
        )
        UNION
        (
          select 
            s.code::varchar, 
            INITCAP(s.name) as name, 
            s.type, 
            INITCAP(s.river) as river, 
            s.location, 
            'ANA' as responsible, 
            'RHA' as network, 
            false as ph,
            false as "OD",
            false as electric_conductivity,
            false as turbidity,
            false as sample_temperature,
            false as total_dissolved_solid,
            false as total_nitrogen,
            false as total_ortophosphate,
            false as total_suspension_solid,
            EXISTS(select 1 from observation_ana o where o.rain is not null and o.station_code = s.code) as rain,
            EXISTS(select 1 from observation_ana o where o.flow_rate is not null and o.station_code = s.code) as flow_rate,
            EXISTS(select 1 from observation_ana o where o.adopted_level is not null and o.station_code = s.code) as adopted_level
          from station_all s inner join pontos_de_interesse p
          on (ST_Intersects(p.geom, s.location) or p.id = s.code::varchar)
          where p.id is not null
        )
        UNION
        (
          select 
            s.code, 
            INITCAP(s.name) as name, 
            null as type, 
            INITCAP(s.river) as river, 
            s.geometry as location, 
            'IDEAM' as responsible, 
            'RHA' as network,
            false as ph,
            false as "OD",
            false as electric_conductivity,
            false as turbidity,
            false as sample_temperature,
            false as total_dissolved_solid,
            false as total_nitrogen,
            false as total_ortophosphate,
            false as total_suspension_solid,
            EXISTS(select 1 from observation_ideam o where o.rain_mm_d is not null and o.station_code = s.code) as rain,
            EXISTS(select 1 from observation_ideam o where o.flow_rate_mcs is not null and o.station_code = s.code) as flow_rate,
            EXISTS(select 1 from observation_ideam o where o.level_m is not null and o.station_code = s.code) as adopted_level
          from station_ideam s inner join pontos_de_interesse p
          on (ST_Intersects(p.geom, s.geometry) or p.id = s.code::numeric::varchar)
          where p.id is not null
        )
        UNION
        (
          select 
            s.code, 
            INITCAP(s.name) as name, 
            null as type, 
            INITCAP(s.river) as river, 
            s.location, 
            'SENAMHI BOLÍVIA' as responsible, 
            'RHA' as network,
            false as ph,
            false as "OD",
            false as electric_conductivity,
            false as turbidity,
            false as sample_temperature,
            false as total_dissolved_solid,
            false as total_nitrogen,
            false as total_ortophosphate,
            false as total_suspension_solid,
            EXISTS(select 1 from observation_senhami o where o.rain is not null and o.station_code = s.code) as rain,
            false as flow_rate,
            EXISTS(select 1 from observation_senhami o where o.level is not null and o.station_code = s.code) as adopted_level
          from station_senhami s inner join pontos_de_interesse p
          on (ST_Intersects(p.geom, s.location) or p.id = s.code or lower(s.name) = lower(p.nome)) 
          where p.id is not null
        )
        UNION
        (
          select 
            s.code, 
            INITCAP(s.name) as name, 
            s.type, 
            INITCAP(s.river) as river, 
            s.location, 
            'SENAMHI PERU' as responsible, 
            'RHA' as network,
            false as ph,
            false as "OD",
            false as electric_conductivity,
            false as turbidity,
            false as sample_temperature,
            false as total_dissolved_solid,
            false as total_nitrogen,
            false as total_ortophosphate,
            false as total_suspension_solid,
            EXISTS(select 1 from observation_senhami_pe o where o.rain is not null and o.station_code = s.code) as rain,
            false as flow_rate,
            EXISTS(select 1 from observation_senhami_pe o where o.level is not null and o.station_code = s.code) as adopted_level
          from station_senhami_pe s inner join pontos_de_interesse p
          on (ST_Intersects(p.geom, s.location) or p.id = s.code) 
          where p.id is not null
        )
        UNION
        (
          select 
            s.code::varchar, 
            INITCAP(s.name) as name, 
            s.type, 
            INITCAP(s.river) as river, 
            s.location, 
            'ANA' as responsible, 
            'RQA' as network, 
            EXISTS(select 1 from water_quality_observation q where q.ph is not null and q.station_code = s.code) as ph,
            EXISTS(select 1 from water_quality_observation q where q."OD" is not null and q.station_code = s.code) as "OD",
            EXISTS(select 1 from water_quality_observation q where q.electric_conductivity is not null and q.station_code = s.code) as electric_conductivity,
            EXISTS(select 1 from water_quality_observation q where q.turbidity is not null and q.station_code = s.code) as turbidity,
            EXISTS(select 1 from water_quality_observation q where q.sample_temperature is not null and q.station_code = s.code) as sample_temperature,
            EXISTS(select 1 from water_quality_observation q where q.total_dissolved_solid is not null and q.station_code = s.code) as total_dissolved_solid,
            EXISTS(select 1 from water_quality_observation q where q.total_nitrogen is not null and q.station_code = s.code) as total_nitrogen,
            EXISTS(select 1 from water_quality_observation q where q.total_ortophosphate is not null and q.station_code = s.code) as total_ortophosphate,
            EXISTS(select 1 from water_quality_observation q where q.total_suspension_solid is not null and q.station_code = s.code) as total_suspension_solid,
            false as rain,
            false as flow_rate,
            false as adopted_level
          from station_all s inner join rrmca_general r
          on (ST_Intersects(r.geom, s.location) or s.code = r.codigo)
        )
        UNION
        (
          select 
            s.code, 
            INITCAP(s.name) as name, 
            null as type, 
            INITCAP(s.river) as river, 
            s.geometry as location, 
            'IDEAM' as responsible, 
            'RQA' as network,
            EXISTS(select 1 from water_quality_ideam q where q.ph is not null and q.station_code = s.code) as ph,
            EXISTS(select 1 from water_quality_ideam q where q."OD" is not null and q.station_code = s.code) as "OD",
            EXISTS(select 1 from water_quality_ideam q where q.electric_conductivity is not null and q.station_code = s.code) as electric_conductivity,
            EXISTS(select 1 from water_quality_ideam q where q.turbidity is not null and q.station_code = s.code) as turbidity,
            EXISTS(select 1 from water_quality_ideam q where q.sample_temperature is not null and q.station_code = s.code) as sample_temperature,
            EXISTS(select 1 from water_quality_ideam q where q.total_dissolved_solid is not null and q.station_code = s.code) as total_dissolved_solid,
            EXISTS(select 1 from water_quality_ideam q where q.total_nitrogen is not null and q.station_code = s.code) as total_nitrogen,
            EXISTS(select 1 from water_quality_ideam q where q.total_ortophosphate is not null and q.station_code = s.code) as total_ortophosphate,
            EXISTS(select 1 from water_quality_ideam q where q.total_suspension_solid is not null and q.station_code = s.code) as total_suspension_solid,
            false as rain,
            false as flow_rate,
            false as adopted_level
          from station_ideam s inner join rrmca_general r
          on (ST_Intersects(r.geom, s.geometry) or s.code::numeric = r.codigo)
        )
        UNION
        (
          select 
            s.code, 
            INITCAP(s.name) as name, 
            null as type, 
            INITCAP(s.river) as river, 
            geometry as location, 
            'SINCA' as responsible, 
            'RQA' as network,
            EXISTS(select 1 from water_quality_sinca q where q.ph is not null and q.station_code = s.code) as ph,
            EXISTS(select 1 from water_quality_sinca q where q."OD" is not null and q.station_code = s.code) as "OD",
            EXISTS(select 1 from water_quality_sinca q where q.electric_conductivity is not null and q.station_code = s.code) as electric_conductivity,
            EXISTS(select 1 from water_quality_sinca q where q.turbidity is not null and q.station_code = s.code) as turbidity,
            EXISTS(select 1 from water_quality_sinca q where q.sample_temperature is not null and q.station_code = s.code) as sample_temperature,
            EXISTS(select 1 from water_quality_sinca q where q.total_dissolved_solid is not null and q.station_code = s.code) as total_dissolved_solid,
            EXISTS(select 1 from water_quality_sinca q where q.total_nitrogen is not null and q.station_code = s.code) as total_nitrogen,
            EXISTS(select 1 from water_quality_sinca q where q.total_ortophosphate is not null and q.station_code = s.code) as total_ortophosphate,
            EXISTS(select 1 from water_quality_sinca q where q.total_suspension_solid is not null and q.station_code = s.code) as total_suspension_solid,
            false as rain,
            false as flow_rate,
            false as adopted_level
          from station_sinca s inner join rrmca_general r
          on (ST_Intersects(r.geom, s.geometry) or s.code = r.codigo::varchar)
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
