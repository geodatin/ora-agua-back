import { MigrationInterface, QueryRunner } from 'typeorm'
import { View } from 'typeorm/schema-builder/view/View'

export class CreateObservationRqaView1645211100122
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createView(
      new View({
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
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropView('observation_rqa_view')
  }
}
