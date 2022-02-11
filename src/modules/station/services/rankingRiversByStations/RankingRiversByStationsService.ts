import { IFiltersDTO } from '@modules/station/dtos/IFiltersDTO'
import { IRankingDTO } from '@modules/station/dtos/IRankingDTO'
import { IStationViewRepository } from '@modules/station/repositories/IStationViewRepository'
import { countPages, paginate } from '@utils/paginate'
import json2csv from 'json2csv'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  order: string
  page: number
  filters: IFiltersDTO
  format: string
}

@injectable()
class RankingRiversByStationsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute({
    order,
    page,
    filters,
    format,
  }: IRequest): Promise<IRankingDTO | string> {
    const ranking = await this.stationViewRepository.rankingRiversByStations(
      filters,
      order
    )

    if (format === 'csv') {
      const csv = json2csv.parse(ranking)
      return csv
    }

    const newRanking: {
      river: string
      valueRHA: number
      valueRQA: number
      valueHYBAM: number
      total: number
      position: number
    }[] = []

    ranking.forEach(({ river, count, network }) => {
      const riverIndex = newRanking.findIndex((data) => data.river === river)
      if (riverIndex !== -1) {
        if (network === 'RHA') {
          newRanking[riverIndex].valueRHA = count
          newRanking[riverIndex].total += count
        } else if (network === 'RQA') {
          newRanking[riverIndex].valueRQA = count
          newRanking[riverIndex].total += count
        } else if (network === 'HYBAM') {
          newRanking[riverIndex].valueHYBAM = count
          newRanking[riverIndex].total += count
        }
      } else {
        newRanking.push({
          river,
          valueRHA: network === 'RHA' ? count : 0,
          valueRQA: network === 'RQA' ? count : 0,
          valueHYBAM: network === 'HYBAM' ? count : 0,
          total: count,
          position: null,
        })
      }
    })

    newRanking
      .sort((a, b) => {
        if (order === 'asc') {
          return a.total - b.total
        }
        return b.total - a.total
      })
      .forEach((element, index) => {
        element.position = index + 1
      })

    const pageValues = paginate(newRanking, page, 5)

    const x: string[] = []
    const valuesRHA: number[] = []
    const valuesRQA: number[] = []
    const valuesHYBAM: number[] = []
    const pos: number[] = []

    pageValues.forEach(
      ({ position, river, valueRQA, valueRHA, valueHYBAM }) => {
        x.push(river)
        valuesHYBAM.push(valueHYBAM)
        valuesRHA.push(valueRHA)
        valuesRQA.push(valueRQA)
        pos.push(position)
      }
    )

    return {
      x,
      datasets: [
        {
          label: 'RHA',
          data: valuesRHA,
        },
        {
          label: 'RQA',
          data: valuesRQA,
        },
        {
          label: 'HYBAM',
          data: valuesHYBAM,
        },
      ],
      position: pos,
      pages: countPages(ranking, 5),
    }
  }
}

export { RankingRiversByStationsService }
