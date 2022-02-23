import { countPages, paginate } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'

import {
  ILastObservationRequestDTO,
  ILastObservationResponseDTO,
} from '../../dtos/ILastObservationDTO'
import { ILastObservationRhaViewRepository } from '../../repositories/ILastObservationRhaViewRepository'

@injectable()
export class LastObservationService {
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

    response.forEach((observation: ILastObservationResponseDTO) => {
      observation.observations = []
      for (const key in observation) {
        if (key.toString().includes('observations_')) {
          const newKey = key.split('_')[1]
          observation.observations.push({
            key: newKey,
            value: observation[key],
          })
          delete observation[key]
        }
      }
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
