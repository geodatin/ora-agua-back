import { ViewColumn, ViewEntity } from 'typeorm'

@ViewEntity({
  expression: ` 
      SELECT observation.station_code,
        observation."timestamp",
        observation.rain,
        observation.flow_rate,
        observation.level,
        observation.responsible
      FROM ( SELECT o.station_code::character varying AS station_code,
                o."timestamp",
                o.rain,
                o.flow_rate,
                o.adopted_level AS level,
                'ANA'::text AS responsible
              FROM observation_ana o
                JOIN station_view s ON s.code::text = o.station_code::character varying::text
              WHERE s.network = 'RHA'
        UNION
            SELECT o.station_code,
                o."timestamp",
                o.rain_mm_d AS rain,
                o.flow_rate_mcs AS flow_rate,
                o.level_m AS level,
                'IDEAM'::text AS responsible
              FROM observation_ideam o
                JOIN station_view s ON s.code::text = o.station_code::text
              WHERE s.network = 'RHA'
        UNION
            SELECT o.station_code,
                o."timestamp",
                o.rain,
                NULL::double precision AS flow_rate,
                o.level,
                'SENAMHI BOLÍVIA'::text AS responsible
              FROM observation_senhami o
                JOIN station_view s ON s.code::text = o.station_code::text
              WHERE s.network = 'RHA'
        UNION
            SELECT o.station_code,
                o."timestamp",
                o.rain,
                NULL::double precision AS flow_rate,
                o.level,
                'SENAMHI PERU'::text AS responsible
              FROM observation_senhami_pe o
                JOIN station_view s ON s.code::text = o.station_code::text
          WHERE s.network = 'RHA') observation;`,
  materialized: true,
  name: 'observation_rha_view',
})
export class ObservationRhaView {
  @ViewColumn()
  code: number

  @ViewColumn()
  timestamp: Date

  @ViewColumn()
  rain: number

  @ViewColumn({ name: 'flow_rate' })
  flowRate: number

  @ViewColumn()
  level: number

  @ViewColumn()
  responsible: string
}
