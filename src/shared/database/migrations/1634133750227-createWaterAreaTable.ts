import { MigrationInterface, QueryRunner } from 'typeorm'

export class createWaterAreaTable1634133750227 implements MigrationInterface {
  name = 'createWaterAreaTable1634133750227'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "water_area" ("km2_amaz" double precision, "km2_pais" double precision, "level2" double precision, "level3" double precision, "level4" double precision, "level5" double precision, "level6" double precision, "level7" double precision, "country_code" character varying, "country_name" character varying NOT NULL, "country_acronym" character varying, "water_percentage" double precision, "water_area" double precision, "class" integer NOT NULL, "year" integer NOT NULL, "lat" double precision, "lon" double precision, CONSTRAINT "PK_d659a0af6855f6eb2626f67ec30" PRIMARY KEY ("country_name", "class", "year"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "water_area"`)
  }
}
