import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { Station } from '../../station/models/Station'

@Entity()
class WaterQualityObservation {
  @PrimaryColumn({ name: 'station_code' })
  @ManyToOne((type) => Station)
  @JoinColumn({ name: 'station_code', referencedColumnName: 'code' })
  stationCode: number

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date

  @Column({ name: 'num_measurement', type: 'float', nullable: true })
  numMeasurement: number

  @Column({ name: 'pos_horiz_coleta', type: 'float', nullable: true })
  posHorizColeta: number

  @Column({ name: 'pos_vert_coleta', type: 'float', nullable: true })
  posVertColeta: number

  @Column({ name: 'rain', type: 'float', nullable: true })
  rain: number

  @Column({ name: 'depth', type: 'float', nullable: true })
  depth: number

  @Column({ name: 'air_temp', type: 'float', nullable: true })
  airTemp: number

  @Column({ name: 'temp_amostra', type: 'float', nullable: true })
  tempAmostra: number

  @Column({ name: 'ph', type: 'float', nullable: true })
  ph: number

  @Column({ name: 'color', type: 'float', nullable: true })
  color: number

  @Column({ name: 'haze', type: 'float', nullable: true })
  haze: number

  @Column({ name: 'electric_conductivity', type: 'float', nullable: true })
  electricConductivity: number

  @Column({ name: 'total_hardness', type: 'float', nullable: true })
  totalHardness: number

  @Column({ name: 'hardness', type: 'float', nullable: true })
  hardness: number

  @Column({ name: 'DQO', type: 'float', nullable: true })
  DQO: number

  @Column({ name: 'DBO', type: 'float', nullable: true })
  DBO: number

  @Column({ name: 'OD', type: 'float', nullable: true })
  OD: number

  @Column({ name: 'total_solid', type: 'float', nullable: true })
  totalSolid: number

  @Column({ name: 'steady_solid', type: 'float', nullable: true })
  steadySolid: number

  @Column({ name: 'volatile_solid', type: 'float', nullable: true })
  volatileSolid: number

  @Column({ name: 'total_suspension_solid', type: 'float', nullable: true })
  totalSuspensionSolid: number

  @Column({ name: 'steady_suspension_solid', type: 'float', nullable: true })
  steadySuspensionSolid: number

  @Column({ name: 'volatile_suspension_solid', type: 'float', nullable: true })
  volatileSuspensionSolid: number

  @Column({ name: 'total_dissolved_solid', type: 'float', nullable: true })
  totalDissolvedSolid: number

  @Column({ name: 'fixed_dissolved_solid', type: 'float', nullable: true })
  fixedDissolvedSolid: number

  @Column({ name: 'volatile_dissolved_solid', type: 'float', nullable: true })
  volatileDissolvedSolid: number

  @Column({ name: 'sedimentable_solid', type: 'float', nullable: true })
  sedimentableSolid: number

  @Column({ name: 'detergent', type: 'float', nullable: true })
  detergent: number

  @Column({ name: 'alkalinityCO3', type: 'float', nullable: true })
  alkalinityCO3: number

  @Column({ name: 'alkalinityHCO3', type: 'float', nullable: true })
  alkalinityHCO3: number

  @Column({ name: 'alkalinityOH', type: 'float', nullable: true })
  alkalinityOH: number

  @Column({ name: 'chlorides', type: 'float', nullable: true })
  chlorides: number

  @Column({ name: 'sulfates', type: 'float', nullable: true })
  sulfates: number

  @Column({ name: 'fluoretos', type: 'float', nullable: true })
  fluoretos: number

  @Column({ name: 'total_phosphate', type: 'float', nullable: true })
  totalPhosphate: number

  @Column({ name: 'cyanides', type: 'float', nullable: true })
  cyanides: number

  @Column({ name: 'total_nitrogen', type: 'float', nullable: true })
  totalNitrogen: number

  @Column({ name: 'non_ionizable_ammonia', type: 'float', nullable: true })
  nonIonizableAmomonia: number

  @Column({ name: 'amoniacal_nitrogen', type: 'float', nullable: true })
  amoniacalNitrogen: number

  @Column({ name: 'nitrates', type: 'float', nullable: true })
  nitrates: number

  @Column({ name: 'nitrites', type: 'float', nullable: true })
  nitrites: number

  @Column({ name: 'organochlorine_compounds', type: 'float', nullable: true })
  organochlorineCompounds: number

  @Column({ name: 'organophosphate_compounds', type: 'float', nullable: true })
  organophosphateCompounds: number

  @Column({ name: 'aluminum', type: 'float', nullable: true })
  aluminum: number

  @Column({ name: 'arsenic', type: 'float', nullable: true })
  arsenic: number

  @Column({ name: 'cadmium', type: 'float', nullable: true })
  cadmium: number

  @Column({ name: 'lead', type: 'float', nullable: true })
  lead: number

  @Column({ name: 'copper', type: 'float', nullable: true })
  copper: number

  @Column({ name: 'trivalent_chromium', type: 'float', nullable: true })
  trivalentChromium: number

  @Column({ name: 'hexavalent_chromium', type: 'float', nullable: true })
  hexavalentChromium: number

  @Column({ name: 'manganese', type: 'float', nullable: true })
  manganese: number

  @Column({ name: 'mercury', type: 'float', nullable: true })
  mercury: number

  @Column({ name: 'nickel', type: 'float', nullable: true })
  nickel: number

  @Column({ name: 'zinc', type: 'float', nullable: true })
  zinc: number

  @Column({ name: 'fenois_index', type: 'float', nullable: true })
  fenoisIndex: number

  @Column({ name: 'total_coliforms', type: 'float', nullable: true })
  totalColiforms: number

  @Column({ name: 'fecal_coliforms', type: 'float', nullable: true })
  fecalColiforms: number

  @Column({ name: 'residual_chlorine', type: 'float', nullable: true })
  residualChlorine: number

  @Column({ name: 'barium', type: 'float', nullable: true })
  barium: number

  @Column({ name: 'berilium', type: 'float', nullable: true })
  berilium: number

  @Column({ name: 'boro', type: 'float', nullable: true })
  boro: number

  @Column({ name: 'cobalt', type: 'float', nullable: true })
  cobalt: number

  @Column({ name: 'tin', type: 'float', nullable: true })
  tin: number

  @Column({ name: 'litium', type: 'float', nullable: true })
  litium: number

  @Column({ name: 'silver', type: 'float', nullable: true })
  silver: number

  @Column({ name: 'selenium', type: 'float', nullable: true })
  selenium: number

  @Column({ name: 'total_uranium', type: 'float', nullable: true })
  totalUranium: number

  @Column({ name: 'vanadium', type: 'float', nullable: true })
  vanadium: number

  @Column({ name: 'benzene', type: 'float', nullable: true })
  benzene: number

  @Column({ name: 'benzo_pireno', type: 'float', nullable: true })
  benzoPireno: number

  @Column({ name: 'n11Dicloroeteno', type: 'float', nullable: true })
  n11Dicloroeteno: number

  @Column({ name: 'n12Dicloroetano', type: 'float', nullable: true })
  n12Dicloroetano: number

  @Column({ name: 'pentaclorofenol', type: 'float', nullable: true })
  pentaclorofenol: number

  @Column({ name: 'tetracloroeteno', type: 'float', nullable: true })
  tetracloroeteno: number

  @Column({ name: 'tricloroeteno', type: 'float', nullable: true })
  tricloroeteno: number

  @Column({ name: 'tetracloretocarbono', type: 'float', nullable: true })
  tetracloretocarbono: number

  @Column({ name: 'n246Triclorofenol', type: 'float', nullable: true })
  n246Triclorofenol: number

  @Column({ name: 'aldrin', type: 'float', nullable: true })
  aldrin: number

  @Column({ name: 'clordano', type: 'float', nullable: true })
  clordano: number

  @Column({ name: 'DDT', type: 'float', nullable: true })
  DDT: number

  @Column({ name: 'dieldrin', type: 'float', nullable: true })
  dieldrin: number

  @Column({ name: 'endrin', type: 'float', nullable: true })
  endrin: number

  @Column({ name: 'endossulfan', type: 'float', nullable: true })
  endossulfan: number

  @Column({ name: 'epoxido_heptacloro', type: 'float', nullable: true })
  epoxidoHeptacloro: number

  @Column({ name: 'hepta_chlorine', type: 'float', nullable: true })
  heptaChlorine: number

  @Column({ name: 'lindano', type: 'float', nullable: true })
  lindano: number

  @Column({ name: 'metox_chlorine', type: 'float', nullable: true })
  metoxChlorine: number

  @Column({ name: 'dodec_mono_chlorine', type: 'float', nullable: true })
  dodecMonoChlorine: number

  @Column({ name: 'benfenilas_policloradas', type: 'float', nullable: true })
  benfenilasPolicloradas: number

  @Column({ name: 'toxafeno', type: 'float', nullable: true })
  toxafeno: number

  @Column({ name: 'demeton', type: 'float', nullable: true })
  demeton: number

  @Column({ name: 'gution', type: 'float', nullable: true })
  gution: number

  @Column({ name: 'malation', type: 'float', nullable: true })
  malation: number

  @Column({ name: 'paration', type: 'float', nullable: true })
  paration: number

  @Column({ name: 'carbaril', type: 'float', nullable: true })
  carbaril: number

  @Column({
    name: 'Acido24Diclorofenoxiacetico',
    type: 'float',
    nullable: true,
  })
  Acido24Diclorofenoxiacetico: number

  @Column({ name: 'n245TP', type: 'float', nullable: true })
  n245TP: number

  @Column({ name: 'n245T', type: 'float', nullable: true })
  n245T: number

  @Column({ name: 'BHC', type: 'float', nullable: true })
  BHC: number

  @Column({ name: 'ethion', type: 'float', nullable: true })
  ethion: number

  @Column({ name: 'dy_syston_disulfton', type: 'float', nullable: true })
  dySystonDisulfton: number

  @Column({ name: 'phosdrin', type: 'float', nullable: true })
  phosdrin: number

  @Column({ name: 'DDEPP', type: 'float', nullable: true })
  DDEPP: number

  @Column({ name: 'azinfos_etil', type: 'float', nullable: true })
  azinfosEtil: number

  @Column({ name: 'diazinon', type: 'float', nullable: true })
  diazinon: number

  @Column({ name: 'estreptococos_fecais', type: 'float', nullable: true })
  estreptococosFecais: number

  @Column({ name: 'salmonelas', type: 'float', nullable: true })
  salmonelas: number

  @Column({ name: 'colifagos', type: 'float', nullable: true })
  colifagos: number

  @Column({ name: 'heterotrofic_bacterias', type: 'float', nullable: true })
  heterotroficBacterias: number

  @Column({ name: 'protozoa', type: 'float', nullable: true })
  protozoa: number

  @Column({ name: 'fungi', type: 'float', nullable: true })
  fungi: number

  @Column({ name: 'began', type: 'float', nullable: true })
  began: number

  @Column({ name: 'bacteria_board_count', type: 'float', nullable: true })
  bacteriaBoardCount: number

  @Column({ name: 'clorophyll', type: 'float', nullable: true })
  clorophyll: number

  @Column({ name: 'oils', type: 'float', nullable: true })
  oils: number

  @Column({ name: 'total_alcalinity', type: 'float', nullable: true })
  totalAlcalinity: number

  @Column({ name: 'organic_carbon_total', type: 'float', nullable: true })
  organicCarbonTotal: number

  @Column({ name: 'hydrocarbon', type: 'float', nullable: true })
  hydrocarbon: number

  @Column({ name: 'total_ortophosphate', type: 'float', nullable: true })
  totalOrtophosphate: number

  @Column({ name: 'total_chromium', type: 'float', nullable: true })
  totslChromium: number

  @Column({ name: 'metilparation', type: 'float', nullable: true })
  metilparation: number

  @Column({ name: 'organic_nitrogen', type: 'float', nullable: true })
  organicNitrogen: number

  @Column({ name: 'total_sodium', type: 'float', nullable: true })
  totalSodium: number

  @Column({ name: 'total_magnesium', type: 'float', nullable: true })
  totalMagnesium: number

  @Column({ name: 'dissolved_silica', type: 'float', nullable: true })
  dissolvedSilica: number

  @Column({ name: 'total_potassium', type: 'float', nullable: true })
  totalPotassium: number

  @Column({ name: 'total_calcium', type: 'float', nullable: true })
  totalCalcium: number

  @Column({ name: 'total_iron', type: 'float', nullable: true })
  totalIron: number

  @Column({ name: 'liquid_discharge', type: 'float', nullable: true })
  liquidDischarge: number

  @Column({ name: 'total_phosphorus', type: 'float', nullable: true })
  totalPhosphorus: number

  @Column({ name: 'total_bismute', type: 'float', nullable: true })
  totalBismute: number

  @Column({ name: 'acidity', type: 'float', nullable: true })
  acidity: number

  @Column({ name: 'albuminoid_nitrogen', type: 'float', nullable: true })
  albuminoidNitrogen: number

  @Column({ name: 'transparency', type: 'float', nullable: true })
  transparency: number

  @Column({ name: 'patogenic_bacterias', type: 'float', nullable: true })
  patogenicBacterias: number

  @Column({ name: 'total_zooplancton', type: 'float', nullable: true })
  totalZooplancton: number

  @Column({ name: 'amoniac', type: 'float', nullable: true })
  amoniac: number

  @Column({ name: 'IQA', type: 'float', nullable: true })
  IQA: number

  @Column({ name: 'termotolerant_coliforms', type: 'float', nullable: true })
  termotolerantColiforms: number

  @Column({ name: 'escherichia', type: 'float', nullable: true })
  escherichia: number

  @Column({ name: 'dissolved_aluminum', type: 'float', nullable: true })
  dissolvedAluminum: number

  @Column({ name: 'dissolved_boro', type: 'float', nullable: true })
  dissolvedBoro: number

  @Column({ name: 'free_cyanide', type: 'float', nullable: true })
  freeCyanide: number

  @Column({ name: 'dissolved_copper', type: 'float', nullable: true })
  dissolvedCopper: number

  @Column({ name: 'specific_conductivity', type: 'float', nullable: true })
  specificConductivity: number

  @Column({ name: 'cianobacteria_density', type: 'float', nullable: true })
  cianobacteriaDensity: number

  @Column({ name: 'magnesium_hardness', type: 'float', nullable: true })
  magnesiumHardness: number

  @Column({ name: 'dissolved_iron', type: 'float', nullable: true })
  dissolvedIron: number

  @Column({ name: 'quantitative_fitoplancton', type: 'float', nullable: true })
  quantitativeFitoplancton: number

  @Column({ name: 'od_saturation', type: 'float', nullable: true })
  odSaturation: number
}

export { WaterQualityObservation }
