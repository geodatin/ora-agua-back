import { MigrationInterface, QueryRunner } from 'typeorm'

export class createGeochemistryHybamTable1637937708009
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS geochemistry_hybam (
        station_code varchar,
        timestamp timestamp with time zone,
        ca_mg_l float,
        na_mg_l float,
        so4_mg_l float,
        po4_mg_l float,
        f_mg_l float,
        al_mg_l float,
        li_ug_l float,
        v_ug_l float,
        co_ug_l float,
        zn_ug_l float,
        zr_ug_l float,
        ba_ug_l float,
        sn_ug_l float,
        pr_ug_l float,
        eu_ug_l float,
        dy_ug_l float,
        yb_ug_l float,
        mg_mg_l float,
        hco3_mg_l float,
        si_mg_l float,
        sr_mg_l float,
        cod_mg_l float,
        cr_ug_l float,
        ni_ug_l float,
        as_ug_l float,
        mo_ug_l float,
        pb_ug_l float,
        la_ug_l float,
        nd_ug_l float,
        gd_ug_l float,
        ho_ug_l float,
        lu_ug_l float,
        k_mg_l float,
        cl_mg_l float,
        no3_mg_l float,
        fe_mg_l float,
        ti_ug_l float,
        mn_ug_l float,
        cu_ug_l float,
        rb_ug_l float,
        cd_ug_l float,
        u_ug_l float,
        ce_ug_l float,
        sm_ug_l float,
        tb_ug_l float,
        er_ug_l float,
        tm_ug_l float,
        PRIMARY KEY (station_code, timestamp),
        FOREIGN KEY (station_code) REFERENCES station_hybam(code) ON DELETE CASCADE
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('geochemistry_hybam')
  }
}
