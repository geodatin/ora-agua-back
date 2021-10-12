import { ICountRequestDTO } from '@modules/station/dtos/ICountRequestDTO'
import { IStationRepository } from '@modules/station/repositories/IStationRepository'
import { countPages, paginate } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'

@injectable()
class CountStationsByResponsibleService {
  constructor(
    @inject('StationRepository')
    private stationRepository: IStationRepository
  ) {}

  async execute({ order, page }: ICountRequestDTO) {
    const stationsCount =
      await this.stationRepository.countStationsByResponsible({ order })
    const x: string[] = []
    const y: number[] = []
    const pos: number[] = []
    for (const [index, station] of stationsCount.entries()) {
      x.push(station.name)
      y.push(station.count)
      pos.push(index)
    }
    if (page === 1) {
      return {
        x: paginate(x, page, 5),
        y: paginate(y, page, 5),
        position: paginate(pos, page, 5),
        pages: countPages(pos, 5),
      }
    } else {
      return {
        x: paginate(x, page, 5),
        y: paginate(y, page, 5),
        position: paginate(pos, page, 5),
      }
    }
  }
}

export { CountStationsByResponsibleService }
