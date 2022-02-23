import { countPages, paginate } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'

import { ILastObservationRequestDTO } from '../../dtos/ILastObservationDTO'
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
  }: ILastObservationRequestDTO) {
    const response =
      await this.lastObservationRhaViewRepository.getLastObservations(
        filters,
        frequency,
        stationCode
      )

    response.forEach((observation) => {
      observation.values = []
      for (const key in observation) {
        if (key.toString().includes('observations')) {
          const newKey = key.split('_')[1]
          observation.values.push({ key: newKey, value: observation[key] })
          delete observation[key]
        }
      }
      console.log(observation)
    })

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
