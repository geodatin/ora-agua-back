import {
  IGeochemistryArraysDTO,
  IGeochemistryDTO,
} from '@modules/observation/dtos/IGeochemistryDTO'
import { IObservationHybamRepository } from '@modules/observation/repositories/IObservationHybamRepository'
import { IStationHybamRepository } from '@modules/station/repositories/IStationHybamRepository'
import { log } from '@utils/log'
import axios from 'axios'
import cheerio from 'cheerio'
// eslint-disable-next-line import/no-unresolved
import { stringify } from 'csv-stringify/sync'
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'

const elementPropertyObj = {
  Ca: 'ca_mg_l',
  Na: 'na_mg_l',
  SO4: 'so4_mg_l',
  PO4: 'po4_mg_l',
  F: 'f_mg_l',
  Al: 'al_mg_l',
  Li: 'li_ug_l',
  V: 'v_ug_l',
  Co: 'co_ug_l',
  Zn: 'zn_ug_l',
  Zr: 'zr_ug_l',
  Ba: 'ba_ug_l',
  Sn: 'sn_ug_l',
  Pr: 'pr_ug_l',
  Eu: 'eu_ug_l',
  Dy: 'dy_ug_l',
  Yb: 'yb_ug_l',
  Mg: 'mg_mg_l',
  HCO3: 'hco3_mg_l',
  Si: 'si_mg_l',
  Sr: 'sr_mg_l',
  COD: 'cod_mg_l',
  Cr: 'cr_ug_l',
  Ni: 'ni_ug_l',
  As: 'as_ug_l',
  Mo: 'mo_ug_l',
  Pb: 'pb_ug_l',
  La: 'la_ug_l',
  Nd: 'nd_ug_l',
  Gd: 'gd_ug_l',
  Ho: 'ho_ug_l',
  Lu: 'lu_ug_l',
  K: 'k_mg_l',
  Cl: 'cl_mg_l',
  NO3: 'no3_mg_l',
  Fe: 'fe_mg_l',
  Ti: 'ti_ug_l',
  Mn: 'mn_ug_l',
  Cu: 'cu_ug_l',
  Rb: 'rb_ug_l',
  Cd: 'cd_ug_l',
  U: 'u_ug_l',
  Ce: 'ce_ug_l',
  Sm: 'sm_ug_l',
  Tb: 'tb_ug_l',
  Er: 'er_ug_l',
  Tm: 'tm_ug_l',
}

@injectable()
class DownloadGeochemistryHybamSeeder {
  constructor(
    @inject('GeochemistryHybamRepository')
    private geochemistryHybamRepository: IObservationHybamRepository,

    @inject('StationHybamRepository')
    private stationHybamRepository: IStationHybamRepository
  ) {}

  async execute(): Promise<void> {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'tmp',
      `geochemistry_hybam.csv`
    )
    const writeStream = fs.createWriteStream(filePath, {
      encoding: 'utf8',
    })
    const header =
      'station_code,timestamp,ca_mg_l,na_mg_l,so4_mg_l,po4_mg_l,f_mg_l,al_mg_l,li_ug_l,v_ug_l,co_ug_l,zn_ug_l,zr_ug_l,ba_ug_l,sn_ug_l,pr_ug_l,eu_ug_l,dy_ug_l,yb_ug_l,mg_mg_l,hco3_mg_l,si_mg_l,sr_mg_l,cod_mg_l,cr_ug_l,ni_ug_l,as_ug_l,mo_ug_l,pb_ug_l,la_ug_l,nd_ug_l,gd_ug_l,ho_ug_l,lu_ug_l,k_mg_l,cl_mg_l,no3_mg_l,fe_mg_l,ti_ug_l,mn_ug_l,cu_ug_l,rb_ug_l,cd_ug_l,u_ug_l,ce_ug_l,sm_ug_l,tb_ug_l,er_ug_l,tm_ug_l'
    writeStream.write(header + '\n')

    const stations = await this.stationHybamRepository.getStationsType()

    const lastObservations =
      await this.geochemistryHybamRepository.getLastObservation()

    let count = 0

    log('Downloading hybam geochemistry data...')
    for (const { code } of stations) {
      const map = new Map<number, IGeochemistryDTO>()
      const data = await this.fetchGeochemistryData(code)

      const lastObservation = lastObservations.find(
        (element) => element.code === code
      )
      const lastObservationDate = lastObservation?.date

      for (const element of Object.keys(data)) {
        const measurements = data[element]
        for (const [timestamp, value] of measurements) {
          const date = new Date(timestamp)
          if (!lastObservationDate || date > lastObservationDate) {
            if (map.has(timestamp)) {
              const entry = map.get(timestamp)
              entry[element] = value
              map.set(timestamp, entry)
            } else {
              const entry: IGeochemistryDTO = {
                // eslint-disable-next-line camelcase
                station_code: code,
                timestamp: date.toISOString(),
              }
              entry[element] = value
              map.set(timestamp, entry)
            }
          }
        }
      }

      for (const measurement of map.values()) {
        const isEmpty = Object.values(measurement)
          .slice(2)
          .every((x) => x === null || x === undefined)
        if (!isEmpty) {
          const line = stringify([measurement], {
            columns: [
              'station_code',
              'timestamp',
              'ca_mg_l',
              'na_mg_l',
              'so4_mg_l',
              'po4_mg_l',
              'f_mg_l',
              'al_mg_l',
              'li_ug_l',
              'v_ug_l',
              'co_ug_l',
              'zn_ug_l',
              'zr_ug_l',
              'ba_ug_l',
              'sn_ug_l',
              'pr_ug_l',
              'eu_ug_l',
              'dy_ug_l',
              'yb_ug_l',
              'mg_mg_l',
              'hco3_mg_l',
              'si_mg_l',
              'sr_mg_l',
              'cod_mg_l',
              'cr_ug_l',
              'ni_ug_l',
              'as_ug_l',
              'mo_ug_l',
              'pb_ug_l',
              'la_ug_l',
              'nd_ug_l',
              'gd_ug_l',
              'ho_ug_l',
              'lu_ug_l',
              'k_mg_l',
              'cl_mg_l',
              'no3_mg_l',
              'fe_mg_l',
              'ti_ug_l',
              'mn_ug_l',
              'cu_ug_l',
              'rb_ug_l',
              'cd_ug_l',
              'u_ug_l',
              'ce_ug_l',
              'sm_ug_l',
              'tb_ug_l',
              'er_ug_l',
              'tm_ug_l',
            ],
          })
          count++
          writeStream.write(line)
        }
      }
    }

    if (count > 0) {
      log('Inserting hybam geochemistry data...')
      await this.geochemistryHybamRepository.insertFromCSV(filePath, header)
      log('Hybam geochemistry insertion finished.')
    } else {
      log('No new geochemistry data.')
    }

    fs.unlinkSync(filePath)
  }

  private async fetchGeochemistryData(
    stationId: string
  ): Promise<IGeochemistryArraysDTO> {
    let resp = await axios.get(
      `http://hybam.omp.obs-mip.fr:8080/hybamvisu-web/faces/Display.xhtml?stati=${stationId}&ref=1&login=iagomachado&langue=pt_BR&data_types=4-0_4-1_4-2_4-3_4-4_4-5_4-6_4-9_4-11_4-13_4-14_4-10_4-7_4-12_5-0_5-1_5-2_5-3_5-4_5-5_5-6_5-7_5-8_5-9_5-10_5-11_5-12_5-13_6-0_6-1_6-2_6-3_6-4_6-5_6-6_6-7_6-8_6-9_6-10_6-11_6-12_6-13_6-14_6-15_6-16_6-17&ref=1&newchart=yes&site=1`
    )
    const $ = cheerio.load(resp.data)
    let url = $('script[charset="UTF-8"]').first().attr('src')
    resp = await axios.get(url)
    url = String(resp.data).match(/http.*json/g)[0]
    resp = await axios.get(url)

    const data: IGeochemistryArraysDTO = {}
    const dataSize = (Object.keys(resp.data).length - 1) / 2
    for (const element of Object.keys(elementPropertyObj)) {
      const property = elementPropertyObj[element]
      for (let i = 0; i < dataSize; i++) {
        if (resp.data[`name_${i}`]?.startsWith(element)) {
          data[property] = resp.data[`averages_${i}`]
          break
        }
      }
    }

    return data
  }
}

export { DownloadGeochemistryHybamSeeder }
