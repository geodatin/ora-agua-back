import { MigrationInterface, QueryRunner } from 'typeorm'

export class createObservationTable1632698376293 implements MigrationInterface {
  name = 'createObservationTable1632698376293'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "observation" ("code" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "rain" double precision, "q_rain" double precision, "flow_rate" double precision, "q_flow_rate" double precision, "adopted_level" double precision, "q_adopted_level" double precision, CONSTRAINT "PK_8c7d9cd56810f64e1315da4a022" PRIMARY KEY ("code", "timestamp"))`
    )
    await queryRunner.query(
      `ALTER TABLE "observation" ADD CONSTRAINT "FK_326ee0d0207151b53f9fde2528d" FOREIGN KEY ("code") REFERENCES "station"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "observation" DROP CONSTRAINT "FK_326ee0d0207151b53f9fde2528d"`
    )
    await queryRunner.query(`DROP TABLE "observation"`)
  }
}
