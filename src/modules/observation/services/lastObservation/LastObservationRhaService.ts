import { ILastObservationDTO } from '@modules/observation/dtos/ILastObservationDTO'
import { ILastObservationRhaViewRepository } from '@modules/observation/repositories/ILastObservationRhaViewRepository'
import { countPages, paginate } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'

@injectable()
export class LastObservationRhaService {
  constructor(
    @inject('LastObservationRhaViewRepository')
    private lastObservationRhaViewRepository: ILastObservationRhaViewRepository
  ) {}

  async execute({
    page,
    pageSize,
    frequency,
    filters,
    stationCode,
  }: ILastObservationDTO) {
    const response =
      await this.lastObservationRhaViewRepository.getLastObservations(
        filters,
        frequency,
        stationCode
      )
    return {
      values: paginate(response, page, pageSize),
      pages: countPages(response, pageSize),
      total: response.length,
    }
  }
}
