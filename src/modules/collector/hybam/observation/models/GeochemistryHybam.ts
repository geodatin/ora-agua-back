import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { StationHybam } from '../../station/models/StationHybam'

@Entity({ name: 'geochemistry_hybam' })
class GeochemistryHybam {
  @PrimaryColumn({ name: 'station_code' })
  stationCode: string

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ type: 'float', name: 'al_mg_l' })
  alMgL: number

  @Column({ type: 'float', name: 'as_ug_l' })
  asUgL: number

  @Column({ type: 'float', name: 'ba_ug_l' })
  baUgL: number

  @Column({ type: 'float', name: 'ca_mg_l' })
  caMgL: number

  @Column({ type: 'float', name: 'cd_ug_l' })
  cdUgL: number

  @Column({ type: 'float', name: 'ce_ug_l' })
  ceUgL: number

  @Column({ type: 'float', name: 'cl_mg_l' })
  clMgL: number

  @Column({ type: 'float', name: 'co_ug_l' })
  coUgL: number

  @Column({ type: 'float', name: 'cod_mg_l' })
  codMgL: number

  @Column({ type: 'float', name: 'cr_ug_l' })
  crUgL: number

  @Column({ type: 'float', name: 'cu_ug_l' })
  cuUgL: number

  @Column({ type: 'float', name: 'dy_ug_l' })
  dyUgL: number

  @Column({ type: 'float', name: 'er_ug_l' })
  erUgL: number

  @Column({ type: 'float', name: 'eu_ug_l' })
  euUgL: number

  @Column({ type: 'float', name: 'f_mg_l' })
  fMgL: number

  @Column({ type: 'float', name: 'fe_mg_l' })
  feMgL: number

  @Column({ type: 'float', name: 'gd_ug_l' })
  gdUgL: number

  @Column({ type: 'float', name: 'hco3_mg_l' })
  hco3MgL: number

  @Column({ type: 'float', name: 'ho_ug_l' })
  hoUgL: number

  @Column({ type: 'float', name: 'k_mg_l' })
  kMgL: number

  @Column({ type: 'float', name: 'la_ug_l' })
  laUgL: number

  @Column({ type: 'float', name: 'li_ug_l' })
  liUgL: number

  @Column({ type: 'float', name: 'lu_ug_l' })
  luUgL: number

  @Column({ type: 'float', name: 'mg_mg_l' })
  mgMgL: number

  @Column({ type: 'float', name: 'mn_ug_l' })
  mnUgL: number

  @Column({ type: 'float', name: 'mo_ug_l' })
  moUgL: number

  @Column({ type: 'float', name: 'na_mg_l' })
  naMgL: number

  @Column({ type: 'float', name: 'nd_ug_l' })
  ndUgL: number

  @Column({ type: 'float', name: 'ni_ug_l' })
  niUgL: number

  @Column({ type: 'float', name: 'no3_mg_l' })
  no3MgL: number

  @Column({ type: 'float', name: 'pb_ug_l' })
  pbUgL: number

  @Column({ type: 'float', name: 'po4_mg_l' })
  po4MgL: number

  @Column({ type: 'float', name: 'pr_ug_l' })
  prUgL: number

  @Column({ type: 'float', name: 'rb_ug_l' })
  rbUgL: number

  @Column({ type: 'float', name: 'si_mg_l' })
  siMgL: number

  @Column({ type: 'float', name: 'sm_ug_l' })
  smUgL: number

  @Column({ type: 'float', name: 'sn_ug_l' })
  snUgL: number

  @Column({ type: 'float', name: 'so4_mg_l' })
  so4MgL: number

  @Column({ type: 'float', name: 'sr_mg_l' })
  srMgL: number

  @Column({ type: 'float', name: 'tb_ug_l' })
  tbUgL: number

  @Column({ type: 'float', name: 'ti_ug_l' })
  tiUgL: number

  @Column({ type: 'float', name: 'tm_ug_l' })
  tmUgL: number

  @Column({ type: 'float', name: 'u_ug_l' })
  uUgL: number

  @Column({ type: 'float', name: 'v_ug_l' })
  vUgL: number

  @Column({ type: 'float', name: 'yb_ug_l' })
  ybUgL: number

  @Column({ type: 'float', name: 'zn_ug_l' })
  znUgL: number

  @Column({ type: 'float', name: 'zr_ug_l' })
  zrUgL: number

  @ManyToOne(() => StationHybam, (station) => station.geochemistry)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  station: StationHybam
}

export { GeochemistryHybam }
