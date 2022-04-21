import { Point } from 'geojson'
import { Column, ViewEntity } from 'typeorm'

@ViewEntity({
  name: 'station_view',
  materialized: true,
  schema: process.env.SCHEMA,
  expression: `
  SELECT stations.code,
  stations.name,
  stations.type,
  stations.river,
  stations.location,
  stations.responsible,
  stations.network,
  stations.ph,
  stations."OD",
  stations.electric_conductivity,
  stations.turbidity,
  stations.sample_temperature,
  stations.total_dissolved_solid,
  stations.total_nitrogen,
  stations.total_ortophosphate,
  stations.total_suspension_solid,
  stations.rain,
  stations.flow_rate,
  stations.adopted_level,
  countries.name AS country,
  countries.id AS country_id,
  cities.name_es AS city,
  states.name_es AS state
 FROM ( SELECT s.code,
          initcap(s.name::text) AS name,
          s.type,
          initcap(s.river::text) AS river,
          s.location,
          'HYBAM'::text AS responsible,
          'HYBAM'::text AS network,
          (EXISTS ( SELECT 1
                 FROM physical_chemistry_hybam p
                WHERE p.ph IS NOT NULL AND p.station_code::text = s.code::text)) AS ph,
          false AS "OD",
          (EXISTS ( SELECT 1
                 FROM physical_chemistry_hybam p
                WHERE p.conductivity_us IS NOT NULL AND p.station_code::text = s.code::text)) AS electric_conductivity,
          false AS turbidity,
          (EXISTS ( SELECT 1
                 FROM physical_chemistry_hybam p
                WHERE p.temperature_c IS NOT NULL AND p.station_code::text = s.code::text)) AS sample_temperature,
          false AS total_dissolved_solid,
          false AS total_nitrogen,
          (EXISTS ( SELECT 1
                 FROM geochemistry_hybam g
                WHERE g.po4_mg_l IS NOT NULL AND g.station_code::text = s.code::text)) AS total_ortophosphate,
          false AS total_suspension_solid,
          false AS rain,
          (EXISTS ( SELECT 1
                 FROM daily_discharge_hybam d
                WHERE d.discharge_m3_s IS NOT NULL AND d.station_code::text = s.code::text)) AS flow_rate,
          (EXISTS ( SELECT 1
                 FROM daily_water_level_hybam l
                WHERE l.quota_cm IS NOT NULL AND l.station_code::text = s.code::text)) AS adopted_level
         FROM station_hybam s
      UNION
       SELECT s.code::character varying AS code,
          initcap(s.name::text) AS name,
          s.type,
          initcap(s.river::text) AS river,
          s.location,
          'ANA'::text AS responsible,
          'RHA'::text AS network,
          false AS ph,
          false AS "OD",
          false AS electric_conductivity,
          false AS turbidity,
          false AS sample_temperature,
          false AS total_dissolved_solid,
          false AS total_nitrogen,
          false AS total_ortophosphate,
          false AS total_suspension_solid,
          (EXISTS ( SELECT 1
                 FROM observation_ana o
                WHERE o.rain IS NOT NULL AND o.station_code = s.code)) AS rain,
          (EXISTS ( SELECT 1
                 FROM observation_ana o
                WHERE o.flow_rate IS NOT NULL AND o.station_code = s.code)) AS flow_rate,
          (EXISTS ( SELECT 1
                 FROM observation_ana o
                WHERE o.adopted_level IS NOT NULL AND o.station_code = s.code)) AS adopted_level
         FROM station_ana s
           JOIN pontos_de_interesse p ON st_intersects(p.geom, s.location) OR p.id::text = s.code::character varying::text
        WHERE p.id IS NOT NULL
      UNION
       SELECT s.code,
          initcap(s.name::text) AS name,
          NULL::character varying AS type,
          initcap(s.river::text) AS river,
          s.geometry AS location,
          'IDEAM'::text AS responsible,
          'RHA'::text AS network,
          false AS ph,
          false AS "OD",
          false AS electric_conductivity,
          false AS turbidity,
          false AS sample_temperature,
          false AS total_dissolved_solid,
          false AS total_nitrogen,
          false AS total_ortophosphate,
          false AS total_suspension_solid,
          (EXISTS ( SELECT 1
                 FROM observation_ideam o
                WHERE o.rain_mm_d IS NOT NULL AND o.station_code::text = s.code::text)) AS rain,
          (EXISTS ( SELECT 1
                 FROM observation_ideam o
                WHERE o.flow_rate_mcs IS NOT NULL AND o.station_code::text = s.code::text)) AS flow_rate,
          (EXISTS ( SELECT 1
                 FROM observation_ideam o
                WHERE o.level_m IS NOT NULL AND o.station_code::text = s.code::text)) AS adopted_level
         FROM station_ideam s
           JOIN pontos_de_interesse p ON st_intersects(p.geom, s.geometry) OR p.id::text = s.code::numeric::character varying::text
        WHERE p.id IS NOT NULL
      UNION
       SELECT s.code,
          initcap(s.name::text) AS name,
          NULL::character varying AS type,
          initcap(s.river::text) AS river,
          s.location,
          'SENAMHI BOLÍVIA'::text AS responsible,
          'RHA'::text AS network,
          false AS ph,
          false AS "OD",
          false AS electric_conductivity,
          false AS turbidity,
          false AS sample_temperature,
          false AS total_dissolved_solid,
          false AS total_nitrogen,
          false AS total_ortophosphate,
          false AS total_suspension_solid,
          (EXISTS ( SELECT 1
                 FROM observation_senhami o
                WHERE o.rain IS NOT NULL AND o.station_code::text = s.code::text)) AS rain,
          false AS flow_rate,
          (EXISTS ( SELECT 1
                 FROM observation_senhami o
                WHERE o.level IS NOT NULL AND o.station_code::text = s.code::text)) AS adopted_level
         FROM station_senhami s
           JOIN pontos_de_interesse p ON st_intersects(p.geom, s.location) OR p.id::text = s.code::text OR lower(s.name::text) = lower(p.nome::text)
        WHERE p.id IS NOT NULL
      UNION
       SELECT s.code,
          initcap(s.name::text) AS name,
          s.type,
          initcap(s.river::text) AS river,
          s.location,
          'SENAMHI PERU'::text AS responsible,
          'RHA'::text AS network,
          false AS ph,
          false AS "OD",
          false AS electric_conductivity,
          false AS turbidity,
          false AS sample_temperature,
          false AS total_dissolved_solid,
          false AS total_nitrogen,
          false AS total_ortophosphate,
          false AS total_suspension_solid,
          (EXISTS ( SELECT 1
                 FROM observation_senhami_pe o
                WHERE o.rain IS NOT NULL AND o.station_code::text = s.code::text)) AS rain,
          false AS flow_rate,
          (EXISTS ( SELECT 1
                 FROM observation_senhami_pe o
                WHERE o.level IS NOT NULL AND o.station_code::text = s.code::text)) AS adopted_level
         FROM station_senhami_pe s
           JOIN pontos_de_interesse p ON st_intersects(p.geom, s.location) OR p.id::text = s.code::text
        WHERE p.id IS NOT NULL
      UNION
       SELECT s.code::character varying AS code,
          initcap(s.name::text) AS name,
          s.type,
          initcap(s.river::text) AS river,
          s.location,
          'ANA'::text AS responsible,
          'RQA'::text AS network,
          (EXISTS ( SELECT 1
                 FROM water_quality_observation q
                WHERE q.ph IS NOT NULL AND q.station_code = s.code)) AS ph,
          (EXISTS ( SELECT 1
                 FROM water_quality_observation q
                WHERE q."OD" IS NOT NULL AND q.station_code = s.code)) AS "OD",
          (EXISTS ( SELECT 1
                 FROM water_quality_observation q
                WHERE q.electric_conductivity IS NOT NULL AND q.station_code = s.code)) AS electric_conductivity,
          (EXISTS ( SELECT 1
                 FROM water_quality_observation q
                WHERE q.turbidity IS NOT NULL AND q.station_code = s.code)) AS turbidity,
          (EXISTS ( SELECT 1
                 FROM water_quality_observation q
                WHERE q.sample_temperature IS NOT NULL AND q.station_code = s.code)) AS sample_temperature,
          (EXISTS ( SELECT 1
                 FROM water_quality_observation q
                WHERE q.total_dissolved_solid IS NOT NULL AND q.station_code = s.code)) AS total_dissolved_solid,
          (EXISTS ( SELECT 1
                 FROM water_quality_observation q
                WHERE q.total_nitrogen IS NOT NULL AND q.station_code = s.code)) AS total_nitrogen,
          (EXISTS ( SELECT 1
                 FROM water_quality_observation q
                WHERE q.total_ortophosphate IS NOT NULL AND q.station_code = s.code)) AS total_ortophosphate,
          (EXISTS ( SELECT 1
                 FROM water_quality_observation q
                WHERE q.total_suspension_solid IS NOT NULL AND q.station_code = s.code)) AS total_suspension_solid,
          false AS rain,
          false AS flow_rate,
          false AS adopted_level
         FROM station_ana s
           JOIN ( SELECT rrmca_cobrape.id,
                  rrmca_cobrape.geom,
                  rrmca_cobrape.codigo,
                  rrmca_cobrape.cod_final,
                  rrmca_cobrape.pais,
                  rrmca_cobrape.longitude,
                  rrmca_cobrape.latitude,
                  rrmca_cobrape.x,
                  rrmca_cobrape.y,
                  rrmca_cobrape.cocursodag,
                  rrmca_cobrape.cobacia,
                  rrmca_cobrape.nunivotto2,
                  rrmca_cobrape.sub_bacia,
                  rrmca_cobrape.n_estacoes,
                  rrmca_cobrape.as_2019,
                  rrmca_cobrape.cond_2019,
                  rrmca_cobrape.dbo,
                  rrmca_cobrape.dqo,
                  rrmca_cobrape.fosforotot,
                  rrmca_cobrape.nitrato,
                  rrmca_cobrape.od,
                  rrmca_cobrape.hg_2019,
                  rrmca_cobrape.solid_susp,
                  rrmca_cobrape.temp_ano,
                  rrmca_cobrape.temp_2019,
                  rrmca_cobrape.turbidez,
                  rrmca_cobrape.ph,
                  rrmca_cobrape.s_dbo,
                  rrmca_cobrape.s_dqo,
                  rrmca_cobrape.s_fosforot,
                  rrmca_cobrape.s_nitrato,
                  rrmca_cobrape.s_od,
                  rrmca_cobrape.s_sst,
                  rrmca_cobrape.s_turbidez,
                  rrmca_cobrape.s_ph,
                  rrmca_cobrape.t_as,
                  rrmca_cobrape.t_cond,
                  rrmca_cobrape.t_dbo,
                  rrmca_cobrape.t_dqo,
                  rrmca_cobrape.t_pt,
                  rrmca_cobrape.t_nitrato,
                  rrmca_cobrape.t_od,
                  rrmca_cobrape.t_hg,
                  rrmca_cobrape.t_ph,
                  rrmca_cobrape.t_profundi,
                  rrmca_cobrape.t_solid_su,
                  rrmca_cobrape.t_temp,
                  rrmca_cobrape.t_turbidez,
                  rrmca_cobrape.dist_m,
                  rrmca_cobrape.near_fid,
                  rrmca_cobrape.near_dist,
                  rrmca_cobrape."near_fid+1",
                  rrmca_cobrape.j2_id,
                  rrmca_cobrape.j2_tipo,
                  rrmca_cobrape.j2_existe
                 FROM rrmca_cobrape
                WHERE rrmca_cobrape.dist_m < 5000::numeric) r ON s.code::character varying::text = r.codigo::text
      UNION
       SELECT s.code,
          initcap(s.name::text) AS name,
          NULL::character varying AS type,
          initcap(s.river::text) AS river,
          s.geometry AS location,
          'IDEAM'::text AS responsible,
          'RQA'::text AS network,
          (EXISTS ( SELECT 1
                 FROM water_quality_ideam q
                WHERE q.ph IS NOT NULL AND q.station_code::text = s.code::text)) AS ph,
          (EXISTS ( SELECT 1
                 FROM water_quality_ideam q
                WHERE q."OD" IS NOT NULL AND q.station_code::text = s.code::text)) AS "OD",
          (EXISTS ( SELECT 1
                 FROM water_quality_ideam q
                WHERE q.electric_conductivity IS NOT NULL AND q.station_code::text = s.code::text)) AS electric_conductivity,
          (EXISTS ( SELECT 1
                 FROM water_quality_ideam q
                WHERE q.turbidity IS NOT NULL AND q.station_code::text = s.code::text)) AS turbidity,
          (EXISTS ( SELECT 1
                 FROM water_quality_ideam q
                WHERE q.sample_temperature IS NOT NULL AND q.station_code::text = s.code::text)) AS sample_temperature,
          (EXISTS ( SELECT 1
                 FROM water_quality_ideam q
                WHERE q.total_dissolved_solid IS NOT NULL AND q.station_code::text = s.code::text)) AS total_dissolved_solid,
          (EXISTS ( SELECT 1
                 FROM water_quality_ideam q
                WHERE q.total_nitrogen IS NOT NULL AND q.station_code::text = s.code::text)) AS total_nitrogen,
          (EXISTS ( SELECT 1
                 FROM water_quality_ideam q
                WHERE q.total_ortophosphate IS NOT NULL AND q.station_code::text = s.code::text)) AS total_ortophosphate,
          (EXISTS ( SELECT 1
                 FROM water_quality_ideam q
                WHERE q.total_suspension_solid IS NOT NULL AND q.station_code::text = s.code::text)) AS total_suspension_solid,
          false AS rain,
          false AS flow_rate,
          false AS adopted_level
         FROM station_ideam s
           JOIN rrmca_general r ON st_intersects(r.geom, s.geometry) OR s.code::numeric = r.codigo::numeric
      UNION
       SELECT s.code,
          initcap(s.name::text) AS name,
          NULL::character varying AS type,
          initcap(s.river::text) AS river,
          s.geometry AS location,
          'SINCA'::text AS responsible,
          'RQA'::text AS network,
          (EXISTS ( SELECT 1
                 FROM water_quality_sinca q
                WHERE q.ph IS NOT NULL AND q.station_code::text = s.code::text)) AS ph,
          (EXISTS ( SELECT 1
                 FROM water_quality_sinca q
                WHERE q."OD" IS NOT NULL AND q.station_code::text = s.code::text)) AS "OD",
          (EXISTS ( SELECT 1
                 FROM water_quality_sinca q
                WHERE q.electric_conductivity IS NOT NULL AND q.station_code::text = s.code::text)) AS electric_conductivity,
          (EXISTS ( SELECT 1
                 FROM water_quality_sinca q
                WHERE q.turbidity IS NOT NULL AND q.station_code::text = s.code::text)) AS turbidity,
          (EXISTS ( SELECT 1
                 FROM water_quality_sinca q
                WHERE q.sample_temperature IS NOT NULL AND q.station_code::text = s.code::text)) AS sample_temperature,
          (EXISTS ( SELECT 1
                 FROM water_quality_sinca q
                WHERE q.total_dissolved_solid IS NOT NULL AND q.station_code::text = s.code::text)) AS total_dissolved_solid,
          (EXISTS ( SELECT 1
                 FROM water_quality_sinca q
                WHERE q.total_nitrogen IS NOT NULL AND q.station_code::text = s.code::text)) AS total_nitrogen,
          (EXISTS ( SELECT 1
                 FROM water_quality_sinca q
                WHERE q.total_ortophosphate IS NOT NULL AND q.station_code::text = s.code::text)) AS total_ortophosphate,
          (EXISTS ( SELECT 1
                 FROM water_quality_sinca q
                WHERE q.total_suspension_solid IS NOT NULL AND q.station_code::text = s.code::text)) AS total_suspension_solid,
          false AS rain,
          false AS flow_rate,
          false AS adopted_level
         FROM station_sinca s
           JOIN ( SELECT rrmca_cobrape.id,
                  rrmca_cobrape.geom,
                  rrmca_cobrape.codigo,
                  rrmca_cobrape.cod_final,
                  rrmca_cobrape.pais,
                  rrmca_cobrape.longitude,
                  rrmca_cobrape.latitude,
                  rrmca_cobrape.x,
                  rrmca_cobrape.y,
                  rrmca_cobrape.cocursodag,
                  rrmca_cobrape.cobacia,
                  rrmca_cobrape.nunivotto2,
                  rrmca_cobrape.sub_bacia,
                  rrmca_cobrape.n_estacoes,
                  rrmca_cobrape.as_2019,
                  rrmca_cobrape.cond_2019,
                  rrmca_cobrape.dbo,
                  rrmca_cobrape.dqo,
                  rrmca_cobrape.fosforotot,
                  rrmca_cobrape.nitrato,
                  rrmca_cobrape.od,
                  rrmca_cobrape.hg_2019,
                  rrmca_cobrape.solid_susp,
                  rrmca_cobrape.temp_ano,
                  rrmca_cobrape.temp_2019,
                  rrmca_cobrape.turbidez,
                  rrmca_cobrape.ph,
                  rrmca_cobrape.s_dbo,
                  rrmca_cobrape.s_dqo,
                  rrmca_cobrape.s_fosforot,
                  rrmca_cobrape.s_nitrato,
                  rrmca_cobrape.s_od,
                  rrmca_cobrape.s_sst,
                  rrmca_cobrape.s_turbidez,
                  rrmca_cobrape.s_ph,
                  rrmca_cobrape.t_as,
                  rrmca_cobrape.t_cond,
                  rrmca_cobrape.t_dbo,
                  rrmca_cobrape.t_dqo,
                  rrmca_cobrape.t_pt,
                  rrmca_cobrape.t_nitrato,
                  rrmca_cobrape.t_od,
                  rrmca_cobrape.t_hg,
                  rrmca_cobrape.t_ph,
                  rrmca_cobrape.t_profundi,
                  rrmca_cobrape.t_solid_su,
                  rrmca_cobrape.t_temp,
                  rrmca_cobrape.t_turbidez,
                  rrmca_cobrape.dist_m,
                  rrmca_cobrape.near_fid,
                  rrmca_cobrape.near_dist,
                  rrmca_cobrape."near_fid+1",
                  rrmca_cobrape.j2_id,
                  rrmca_cobrape.j2_tipo,
                  rrmca_cobrape.j2_existe
                 FROM rrmca_cobrape
                WHERE rrmca_cobrape.dist_m < 5000::numeric) r ON s.code::text = r.codigo::text) stations,
  south_america_country countries,
  amazon_city cities,
  amazon_state states
WHERE st_contains(countries.geometry, stations.location) AND st_contains(cities.geom, stations.location) AND st_contains(states.geom, stations.location);
  `,
})
class StationView {
  @Column()
  code: string

  @Column()
  name: string

  @Column({ type: 'geometry', srid: 4326 })
  location: Point

  @Column()
  type: string

  @Column()
  river: string

  @Column()
  responsible: string

  @Column()
  country: string

  @Column({ name: 'country_id' })
  countryId: number

  @Column()
  network: string

  @Column()
  ph: boolean

  @Column({ name: 'OD' })
  OD: boolean

  @Column({ name: 'electric_conductivity' })
  electricConductivity: boolean

  @Column()
  turbidity: boolean

  @Column({ name: 'sample_temperature' })
  sampleTemperature: boolean

  @Column({ name: 'total_dissolved_solid' })
  totalDissolvedSolid: boolean

  @Column({ name: 'total_nitrogen' })
  totalNitrogen: boolean

  @Column({ name: 'total_ortophosphate' })
  totalOrtophosphate: boolean

  @Column({ name: 'total_suspension_solid' })
  totalSuspensionSolid: boolean

  @Column()
  rain: boolean

  @Column({ name: 'flow_rate' })
  flowRate: boolean

  @Column({ name: 'adopted_level' })
  adoptedLevel: boolean

  @Column({ name: 'city' })
  city: string

  @Column({ name: 'state' })
  state: string
}

export { StationView }
