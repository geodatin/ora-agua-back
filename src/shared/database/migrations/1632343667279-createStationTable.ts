import { MigrationInterface, QueryRunner } from 'typeorm'

export class createStationTable1632343667279 implements MigrationInterface {
  name = 'createStationTable1632343667279'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "station" ("code" integer NOT NULL, "id" integer, "name" character varying, "watershed" character varying, "subwatershed" character varying, "river" character varying, "state" character varying, "city" character varying, "responsible" character varying, "operator" character varying, "location" geometry, "drenage_area" double precision, "type" character varying, "operating" boolean, "telemetric" boolean, "climatologic" boolean, "pluviometer" boolean, "rain_register" boolean, "scale" boolean, "level_register" boolean, "liquid_discharge" boolean, "sediments" boolean, "water_quality" boolean, "evaporation_tank" boolean, "pluviometric_period_start" TIMESTAMP WITH TIME ZONE, "rain_register_period_start" TIMESTAMP WITH TIME ZONE, "evaporation_tank_period_start" TIMESTAMP WITH TIME ZONE, "climatologic_period_start" TIMESTAMP WITH TIME ZONE, "telemetric_period_start" TIMESTAMP WITH TIME ZONE, "scale_period_start" TIMESTAMP WITH TIME ZONE, "level_register_period_start" TIMESTAMP WITH TIME ZONE, "liquid_discharge_period_start" TIMESTAMP WITH TIME ZONE, "sediments_period_start" TIMESTAMP WITH TIME ZONE, "water_quality_period_start" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_c99c0125a3c03ea4842fb9c5d0b" PRIMARY KEY ("code"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "station"`)
  }
}
