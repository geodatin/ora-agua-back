import { MigrationInterface, QueryRunner } from 'typeorm'

export class createColumn1633966559987 implements MigrationInterface {
  name = 'createColumn1633966559987'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."station" ADD "country" character varying`
    )
    await queryRunner.query(
      `UPDATE "public"."station" "station" SET "country" = (SELECT "name" FROM "public"."south_america_country" "country" WHERE ST_Contains("country"."geometry", "station"."location"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."station" DROP COLUMN "country"`
    )
  }
}
