import { MigrationInterface, QueryRunner } from 'typeorm'

export class reduceWaterObservatioTable1638541076826
  implements MigrationInterface
{
  name = 'reduceWaterObservatioTable1638541076826'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "num_measurement"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "pos_horiz_coleta"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "pos_vert_coleta"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "air_temp"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "color"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_hardness"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "hardness"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "DQO"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "DBO"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_solid"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "steady_solid"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "volatile_solid"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "steady_suspension_solid"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "volatile_suspension_solid"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "fixed_dissolved_solid"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "volatile_dissolved_solid"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "sedimentable_solid"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "detergent"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "alkalinityCO3"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "alkalinityHCO3"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "alkalinityOH"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "chlorides"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "sulfates"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "fluoretos"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_phosphate"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "cyanides"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "non_ionizable_ammonia"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "amoniacal_nitrogen"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "nitrates"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "nitrites"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "organochlorine_compounds"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "organophosphate_compounds"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "aluminum"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "arsenic"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "cadmium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "lead"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "copper"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "trivalent_chromium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "hexavalent_chromium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "manganese"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "mercury"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "nickel"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "zinc"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "fenois_index"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_coliforms"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "fecal_coliforms"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "residual_chlorine"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "barium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "berilium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "boro"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "cobalt"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "tin"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "litium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "silver"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "selenium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_uranium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "vanadium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "benzene"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "benzo_pireno"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "n11Dicloroeteno"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "n12Dicloroetano"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "pentaclorofenol"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "tetracloroeteno"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "tricloroeteno"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "tetracloretocarbono"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "n246Triclorofenol"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "aldrin"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "clordano"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "DDT"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "dieldrin"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "endrin"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "endossulfan"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "epoxido_heptacloro"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "hepta_chlorine"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "lindano"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "metox_chlorine"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "dodec_mono_chlorine"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "benfenilas_policloradas"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "toxafeno"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "demeton"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "gution"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "malation"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "paration"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "carbaril"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "Acido24Diclorofenoxiacetico"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "n245TP"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "n245T"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "BHC"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "ethion"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "dy_syston_disulfton"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "phosdrin"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "DDEPP"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "azinfos_etil"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "diazinon"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "estreptococos_fecais"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "salmonelas"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "colifagos"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "heterotrofic_bacterias"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "protozoa"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "fungi"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "began"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "bacteria_board_count"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "clorophyll"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "oils"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_alcalinity"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "organic_carbon_total"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "hydrocarbon"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_chromium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "metilparation"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "organic_nitrogen"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_sodium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_magnesium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "dissolved_silica"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_potassium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_calcium"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_iron"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "liquid_discharge"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_phosphorus"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_bismute"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "acidity"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "albuminoid_nitrogen"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "transparency"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "patogenic_bacterias"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "total_zooplancton"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "amoniac"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "IQA"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "termotolerant_coliforms"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "escherichia"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "dissolved_aluminum"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "dissolved_boro"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "free_cyanide"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "dissolved_copper"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "specific_conductivity"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "cianobacteria_density"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "magnesium_hardness"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "dissolved_iron"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "quantitative_fitoplancton"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" DROP COLUMN "od_saturation"`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "od_saturation" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "quantitative_fitoplancton" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "dissolved_iron" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "magnesium_hardness" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "cianobacteria_density" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "specific_conductivity" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "dissolved_copper" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "free_cyanide" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "dissolved_boro" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "dissolved_aluminum" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "escherichia" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "termotolerant_coliforms" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "IQA" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "amoniac" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_zooplancton" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "patogenic_bacterias" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "transparency" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "albuminoid_nitrogen" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "acidity" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_bismute" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_phosphorus" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "liquid_discharge" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_iron" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_calcium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_potassium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "dissolved_silica" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_magnesium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_sodium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "organic_nitrogen" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "metilparation" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_chromium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "hydrocarbon" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "organic_carbon_total" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_alcalinity" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "oils" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "clorophyll" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "bacteria_board_count" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "began" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "fungi" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "protozoa" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "heterotrofic_bacterias" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "colifagos" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "salmonelas" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "estreptococos_fecais" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "diazinon" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "azinfos_etil" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "DDEPP" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "phosdrin" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "dy_syston_disulfton" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "ethion" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "BHC" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "n245T" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "n245TP" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "Acido24Diclorofenoxiacetico" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "carbaril" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "paration" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "malation" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "gution" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "demeton" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "toxafeno" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "benfenilas_policloradas" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "dodec_mono_chlorine" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "metox_chlorine" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "lindano" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "hepta_chlorine" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "epoxido_heptacloro" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "endossulfan" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "endrin" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "dieldrin" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "DDT" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "clordano" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "aldrin" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "n246Triclorofenol" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "tetracloretocarbono" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "tricloroeteno" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "tetracloroeteno" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "pentaclorofenol" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "n12Dicloroetano" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "n11Dicloroeteno" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "benzo_pireno" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "benzene" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "vanadium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_uranium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "selenium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "silver" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "litium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "tin" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "cobalt" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "boro" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "berilium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "barium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "residual_chlorine" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "fecal_coliforms" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_coliforms" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "fenois_index" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "zinc" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "nickel" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "mercury" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "manganese" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "hexavalent_chromium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "trivalent_chromium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "copper" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "lead" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "cadmium" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "arsenic" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "aluminum" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "organophosphate_compounds" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "organochlorine_compounds" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "nitrites" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "nitrates" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "amoniacal_nitrogen" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "non_ionizable_ammonia" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "cyanides" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_phosphate" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "fluoretos" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "sulfates" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "chlorides" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "alkalinityOH" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "alkalinityHCO3" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "alkalinityCO3" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "detergent" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "sedimentable_solid" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "volatile_dissolved_solid" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "fixed_dissolved_solid" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "volatile_suspension_solid" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "steady_suspension_solid" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "volatile_solid" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "steady_solid" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_solid" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "DBO" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "DQO" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "hardness" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "total_hardness" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "color" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "air_temp" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "pos_vert_coleta" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "pos_horiz_coleta" double precision`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."water_quality_observation" ADD "num_measurement" double precision`
    )
  }
}
