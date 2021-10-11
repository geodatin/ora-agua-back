import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateKeys1632841594091 implements MigrationInterface {
  name = 'updateKeys1632841594091'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."observation" DROP CONSTRAINT "FK_326ee0d0207151b53f9fde2528d"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."station" ALTER COLUMN "location" TYPE geometry`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."observation" ADD CONSTRAINT "FK_270d661bd471618e90fd514d34a" FOREIGN KEY ("station_code") REFERENCES "station"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."observation" DROP CONSTRAINT "FK_270d661bd471618e90fd514d34a"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."station" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."observation" ADD CONSTRAINT "FK_326ee0d0207151b53f9fde2528d" FOREIGN KEY ("station_code") REFERENCES "station"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
