import { countPages, paginate } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'

import { ILastObservationDTO } from '../../dtos/ILastObservationDTO'
import { ILastObservationRhaViewRepository } from '../../repositories/ILastObservationRhaViewRepository'

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
    if (stationCode) {
      return response[0]
    }
    return {
      values: paginate(response, page, pageSize),
      pages: countPages(response, pageSize),
      total: response.length,
    }
  }
}
