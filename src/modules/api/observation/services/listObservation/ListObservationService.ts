import { countPages, paginate } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'
import { v4 as createUuid } from 'uuid'

import {
  IListObservationRequestDTO,
  IListObservationResponseDTO,
} from '../../dtos/IListObservationDTO'
import { ILastObservationViewRepository } from '../../repositories/ILastObservationViewRepository'

@injectable()
export class ListObservationService {
  constructor(
    @inject('LastObservationRhaViewRepository')
    private lastObservationRhaViewRepository: ILastObservationViewRepository,
    @inject('LastObservationRqaViewRepository')
    private lastObservationRqaViewRepository: ILastObservationViewRepository
  ) {}

  async execute({
    page,
    pageSize,
    frequency,
    filters,
    stationCode,
  }: IListObservationRequestDTO) {
    let repository: ILastObservationViewRepository
    if (filters.network[0] === 'RQA') {
      repository = this.lastObservationRqaViewRepository
    } else {
      repository = this.lastObservationRhaViewRepository
    }

    const response = await repository.getLastObservations(
      filters,
      frequency,
      stationCode
    )

    response.forEach((observation: IListObservationResponseDTO) => {
      observation.observations = []
      observation.id = createUuid()
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
