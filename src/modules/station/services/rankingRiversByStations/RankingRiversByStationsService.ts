import { IRankingDTO } from '@modules/station/dtos/IRankingDTO'
import { IStationViewRepository } from '@modules/station/repositories/IStationViewRepository'
import { countPages, paginate } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  order: string
  page: number
}

@injectable()
class RankingRiversByStationsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute({ order, page }: IRequest): Promise<IRankingDTO> {
    const ranking = await this.stationViewRepository.rankingRiversByStations(
      order
    )

    const pageValues = paginate(ranking, page, 5)

    const x: string[] = []
    const y: number[] = []
    const pos: number[] = []

    pageValues.forEach(({ position, river, count }) => {
      x.push(river)
      y.push(count)
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
      pages: countPages(ranking, 5),
    }
  }
}

export { RankingRiversByStationsService }
