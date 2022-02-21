import { ViewColumn, ViewEntity } from 'typeorm'

@ViewEntity({
  expression: `
          SELECT observation.* FROM 
          (
            (
                SELECT station_code::varchar, o.timestamp, o."OD", o.electric_conductivity, o.turbidity, o.ph, o.sample_temperature, o.total_dissolved_solid, o.total_nitrogen, o.total_ortophosphate, o.total_suspension_solid,
                'ANA' as responsible
                FROM water_quality_observation o 
                INNER JOIN station_view s ON s.code = o.station_code::varchar
                WHERE s.network = 'RQA' AND s.responsible = 'ANA'
            ) UNION
            (
                SELECT station_code::varchar, o.timestamp, o."OD", o.electric_conductivity, o.turbidity, o.ph, o.sample_temperature, o.total_dissolved_solid, o.total_nitrogen, o.total_ortophosphate, o.total_suspension_solid,
                'IDEAM' as responsible
                FROM water_quality_ideam o 
                INNER JOIN station_view s ON s.code = o.station_code::varchar
                WHERE s.network = 'RQA' AND s.responsible = 'IDEAM'
            ) UNION
            (
                SELECT station_code::varchar, o.timestamp, o."OD", o.electric_conductivity, o.turbidity, o.ph, o.sample_temperature, o.total_dissolved_solid, o.total_nitrogen, o.total_ortophosphate, o.total_suspension_solid,
                'SINCA' as responsible
                FROM water_quality_sinca o 
                INNER JOIN station_view s ON s.code = o.station_code::varchar
                WHERE s.network = 'RQA' AND s.responsible = 'SINCA'
            )
          ) observation
        `,
  name: 'observation_rqa_view',
  materialized: true,
})
export class ObservationRqaView {
  @ViewColumn({ name: 'station_code' })
  stationCode: string

  @ViewColumn()
  timestamp: Date

  @ViewColumn()
  OD: number

  @ViewColumn({ name: 'electric_conductivity' })
  electricConductivity: number

  @ViewColumn()
  turbidity: number

  @ViewColumn()
  ph: number

  @ViewColumn({ name: 'sample_temperature' })
  sampleTemperature: number

  @ViewColumn({ name: 'total_dissolved_solid' })
  totalDissolvedSolid: number

  @ViewColumn({ name: 'total_nitrogen' })
  totalNitrogen: number

  @ViewColumn({ name: 'total_ortophosphate' })
  totalOrtophosphate: number

  @ViewColumn({ name: 'total_suspension_solid' })
  totalSuspensionSolid: number
}
