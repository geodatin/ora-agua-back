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

    const pageValues = paginate(ranking, page, 5)

    const x: string[] = []
    const y: number[] = []
    const networks: string[] = []
    const pos: number[] = []

    pageValues.forEach(({ position, river, count, network }) => {
      x.push(river)
      y.push(count)
      networks.push(network)
      pos.push(position)
    })

    return {
      x,
      series: [
        {
          id: 'station',
          data: y,
        },
      ],
      position: pos,
      networks,
      pages: countPages(ranking, 5),
    }
  }
}

export { RankingRiversByStationsService }
