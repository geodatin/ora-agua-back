import { countPages, paginate } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'
import { v4 as createUuid } from 'uuid'

import {
  IListObservationRequestDTO,
  IListObservationResponseDTO,
} from '../../dtos/IListObservationDTO'
import { ILastObservationViewRepository } from '../../repositories/ILastObservationViewRepository'
import { IObservationRqaViewRepository } from '../../repositories/IObservationRqaViewRepository'

@injectable()
export class ListObservationService {
  constructor(
    @inject('LastObservationRhaViewRepository')
    private lastObservationRhaViewRepository: ILastObservationViewRepository,
    @inject('ObservationRqaViewRepository')
    private observationRqaViewRepository: IObservationRqaViewRepository
  ) {}

  async execute({
    page,
    pageSize,
    frequency,
    filters,
    stationCode,
  }: IListObservationRequestDTO) {
    let repository: ILastObservationViewRepository
    let response = []
    if (filters.network.length > 0) {
      if (filters.network[0] === 'RQA') {
        repository = this.observationRqaViewRepository
      } else {
        repository = this.lastObservationRhaViewRepository
      }

      response = await repository.getLastObservations(
        filters,
        frequency,
        stationCode
      )
    } else {
      const responseRha =
        await this.lastObservationRhaViewRepository.getLastObservations(
          filters,
          frequency,
          stationCode
        )

      const responseRqa =
        await this.observationRqaViewRepository.getLastObservations(
          filters,
          frequency,
          stationCode
        )
      response = responseRha.concat(responseRqa)
    }

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
