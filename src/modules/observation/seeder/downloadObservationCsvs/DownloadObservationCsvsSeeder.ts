import { IWaterQualityObservationRepository } from '@modules/observation/repositories/IWaterQualityObservationRepository'
import { formatDate } from '@utils/formatDate'
import { formatNumber } from '@utils/formatNumber'
import AdmZip from 'adm-zip'
import axios from 'axios'
import csvParser from 'csv-parser'
import filesystem, { createWriteStream, unlinkSync } from 'fs'
import moment from 'moment'
import path from 'path'
import queryString from 'query-string'
import { inject, injectable } from 'tsyringe'

import { IStationRepository } from '../../../station/repositories/IStationRepository'
import { IDownloadOptionsDTO } from '../../dtos/IDownloadOptionsDTO'

@injectable()
class DownloadObservationCsvsSeeder {
  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository,
    @inject('WaterQualityObservationRepository')
    private waterQualityObservationRepository: IWaterQualityObservationRepository
  ) {}
  async execute(): Promise<void> {
    const stations = await this.stationRepository.getAllStationsFullTable()

    for (const [index, station] of stations.entries()) {
      try {
        await this.downloadDocument(station.code)
        console.log(index)
      } catch (err) {
        console.error(err)
      }
    }
    await this.readFiles(
      path.join(
        path.resolve(__dirname, '..', '..', '..', '..', '..', 'assets'),
        'csvs'
      )
    )
  }

  async downloadDocument(stationCode: number) {
    const baseUrl =
      'https://www.snirh.gov.br/hidroweb/rest/api/documento/convencionais'
    const options: IDownloadOptionsDTO = {
      directory: path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        'assets'
      ),
      filename: `download.zip`,
    }
    const query = {
      documentos: stationCode,
      tipo: 3,
    }
    console.log(baseUrl.concat('?', queryString.stringify(query)))
    try {
      await this.downloadFile(
        baseUrl.concat('?', queryString.stringify(query)),
        options
      )
      await this.unzipDocument(options)
    } catch (err) {
      console.error(err.message)
    }
  }

  async unzipDocument(options: IDownloadOptionsDTO): Promise<void> {
    const zip = new AdmZip(path.join(options.directory, options.filename))
    for (const entry of zip.getEntries()) {
      const extension = entry.name.substring(entry.name.length - 3)
      const name = entry.name.substring(0, 8)
      if (extension === 'zip' && name === 'qualagua') {
        zip.extractEntryTo(entry.name, path.join(options.directory, 'zipped'))
        await this.unzipDocument({
          directory: path.join(options.directory, 'zipped'),
          filename: entry.name,
        })
        unlinkSync(path.join(options.directory, 'zipped', entry.name))
      } else if (extension === 'csv' && name === 'qualagua') {
        let shouldPrint = false
        let content = ''
        entry
          .getData()
          .toString()
          .split('\n')
          .forEach((chunck) => {
            if (chunck.split(';')[0] === 'EstacaoCodigo') {
              shouldPrint = true
            }
            if (shouldPrint) {
              content += chunck
            }
          })
        zip.addFile(entry.name, Buffer.from(content, 'utf8'))
        zip.extractAllTo(
          path.join(
            path.resolve(__dirname, '..', '..', '..', '..', '..', 'assets'),
            'csvs'
          )
        )
      }
    }
  }

  async downloadFile(url: string, options: IDownloadOptionsDTO): Promise<void> {
    const writer = createWriteStream(
      path.join(options.directory, options.filename)
    )
    return new Promise<void>((resolve, reject) => {
      axios.get(url, { responseType: 'stream' }).then((response) => {
        if (response.headers['content-length'] === '0') {
          reject(new Error('No content'))
        }
        response.data.pipe(writer)
        writer.on('error', reject)
        writer.on('finish', resolve)
      })
    })
  }

  async readFiles(directory: string): Promise<void> {
    const files = await filesystem.promises.readdir(directory)
    for (const file of files) {
      const observationArray = []
      filesystem
        .createReadStream(path.join(directory, file))
        .pipe(csvParser({ separator: ';' }))
        .on('data', (row) => {
          const date = formatDate(row.Data)
          const hour = row.Hora.split(' ')[1] || '00:00:00'
          for (const key in row) {
            if (key !== 'EstacaoCodigo' && key !== 'Data' && key !== 'Hora') {
              row[key] = formatNumber(row[key])
            }
          }
          const observation = {
            stationCode: row.EstacaoCodigo,
            timestamp: moment(date + ' ' + hour).toDate(),
            numMeasurement: row.NumMedicao,
            posHorizColeta: row.PosHorizColeta,
            posVertColeta: row.PosVertColeta,
            rain: Number(row.Choveu),
            depth: Number(row.Profundidade),
            airTemp: row.TempAr,
            tempAmostra: row.TempAmostra,
            ph: row.pH,
            color: row.Cor,
            haze: row.Turbidez,
            electricConductivity: row.CondutividadeEletrica,
            totalHardness: row.DurezaTotal,
            hardness: row.Dureza,
            DQO: row.DQO,
            DBO: row.DBO,
            OD: row.OD,
            totalSolid: row.SolTotais,
            steadySolid: row.SolFixos,
            volatileSolid: row.SolVolateis,
            totalSuspensionSolid: row.SolSuspensaoTotais,
            steadySuspensionSolid: row.SolSuspensaoFixos,
            volatileSuspensionSolid: row.SolSuspensaoVolateis,
            totalDissolvedSolid: row.SolDissolvidosTotais,
            fixedDissolvedSolid: row.SolDissolvidosFixos,
            volatileDissolvedSolid: row.SolDissolvidosVolateis,
            sedimentableSolid: row.SolSedimentaveis,
            detergent: row.Detergentes,
            alkalinityCO3: row.AlcalinidadeCO3,
            alkalinityHCO3: row.AlcalinidadeHCO3,
            alkalinityOH: row.AlcalinidadeOH,
            chlorides: row.Cloretos,
            sulfates: row.Sulfatos,
            fluoretos: row.Fluoretos,
            totalPhosphate: row.FosfatoTotal,
            cyanides: row.Cianetos,
            totalNitrogen: row.NitrogenioTotal,
            nonIonizableAmomonia: row.AmoniaNaoIonizavel,
            amoniacalNitrogen: row.NitrogenioAmoniacal,
            nitrates: row.Nitratos,
            nitrites: row.Nitritos,
            organochlorineCompounds: row.CompostosOrganoclorados,
            organophosphateCompounds: row.CompostosOrganofosforados,
            aluminum: row.Aluminio,
            arsenic: row.Arsenio,
            cadmium: row.Cadmio,
            lead: row.Chumbo,
            copper: row.Cobre,
            trivalentChromium: row.CromoTrivalente,
            hexavalentChromium: row.CromoHexavalente,
            manganese: row.Manganes,
            mercury: row.Mercurio,
            nickel: row.Niquel,
            zinc: row.Zinco,
            fenoisIndex: row.IndiceFenois,
            totalColiforms: row.ColiformesTotais,
            fecalColiforms: row.ColiformesFecais,
            residualChlorine: row.CloroResidual,
            barium: row.Bario,
            berilium: row.Berilio,
            boro: row.Boro,
            cobalt: row.Cobalto,
            tin: row.Estanho,
            litium: row.Litio,
            silver: row.Prata,
            selenium: row.Selenio,
            totalUranium: row.UranioTotal,
            vanadium: row.Vanadio,
            benzene: row.Benzeno,
            benzoPireno: row.BenzoAPireno,
            n11Dicloroeteno: row.n11Dicloroeteno,
            n12Dicloroetano: row.n12Dicloroetano,
            pentaclorofenol: row.Pentaclorofenol,
            tetracloroeteno: row.Tetracloroeteno,
            tricloroeteno: row.Tricloroeteno,
            tetracloretocarbono: row.TetracloretoCarbono,
            n246Triclorofenol: row.n246Triclorofenol,
            aldrin: row.Aldrin,
            clordano: row.Clordano,
            DDT: row.DDT,
            dieldrin: row.Dieldrin,
            endrin: row.Endrin,
            endossulfan: row.Endossulfan,
            epoxidoHeptacloro: row.EpoxidoHeptacloro,
            heptaChlorine: row.Heptacloro,
            lindano: row.Lindano,
            metoxChlorine: row.Metoxicloro,
            dodecMonoChlorine: row.DodecacloroNonacloro,
            benfenilasPolicloradas: row.BifenilasPolicloradas,
            toxafeno: row.Toxafeno,
            demeton: row.Demeton,
            gution: row.Gution,
            malation: row.Malation,
            paration: row.Paration,
            carbaril: row.Carbaril,
            Acido24Diclorofenoxiacetico: row.Acido24Diclorofenoxiacetico,
            n245TP: row.n245TP,
            n245T: row.n245T,
            BHC: row.BHC,
            ethion: row.Ethion,
            dySystonDisulfton: row.DySystonDisulfton,
            phosdrin: row.Phosdrin,
            DDEPP: row.DDEPP,
            azinfosEtil: row.AzinfosEtil,
            diazinon: row.Diazinon,
            estreptococosFecais: row.EstreptococosFecais,
            salmonelas: row.Salmonelas,
            colifagos: row.Colifagos,
            heterotroficBacterias: row.BacteriasHeterotroficas,
            protozoa: row.Protozoarios,
            fungi: row.Fungos,
            began: row.Algas,
            bacteriaBoardCount: row.ContagemBacteriasPlaca,
            clorophyll: row.Clorofila,
            oils: row.OleosGraxas,
            totalAlcalinity: row.AlcalinidadeTotal,
            organicCarbonTotal: row.CarbonoOrganicoTotal,
            hydrocarbon: row.Hidrocarbonetos,
            totalOrtophosphate: row.OrtofosfatoTotal,
            totslChromium: row.CromoTotal,
            metilparation: row.MetilParation,
            organicNitrogen: row.NitrogenioOrganico,
            totalSodium: row.SodioTotal,
            totalMagnesium: row.MagnesioTotal,
            dissolvedSilica: row.SilicaDissolvida,
            totalPotassium: row.PotassioTotal,
            totalCalcium: row.CalcioTotal,
            totalIron: row.FerroTotal,
            liquidDischarge: row.DescargaLiquida,
            totalPhosphorus: row.FosforoTotal,
            totalBismute: row.BismutoTotal,
            acidity: row.Acidez,
            albuminoidNitrogen: row.NitrogenioAlbuminoide,
            transparency: row.Transparencia,
            patogenicBacterias: row.EnteroBacteriasPatogenicas,
            totalZooplancton: row.ZooplanctonTotal,
            amoniac: row.Amoniaco,
            IQA: row.IQA,
            termotolerantColiforms: row.ColiformesTermotolerantes,
            escherichia: row.Escherichia,
            dissolvedAluminum: row.Aluminiodissolvido,
            dissolvedBoro: row.Borodissolvido,
            freeCyanide: row.Cianetolivre,
            dissolvedCopper: row.Cobredissolvido,
            specificConductivity: row.CondutividadeEspecifica,
            cianobacteriaDensity: row.Densidadecianobacterias,
            magnesiumHardness: row.Durezamagnesio,
            dissolvedIron: row.FerroDissolvido,
            quantitativeFitoplancton: row.FitoplanctonQuantitativo,
            odSaturation: row.ODsaturacao,
          }
          observationArray.push(observation)
        })
        .on('end', async () => {
          await this.waterQualityObservationRepository.createMany(
            observationArray
          )
        })
    }
  }
}

export { DownloadObservationCsvsSeeder }
