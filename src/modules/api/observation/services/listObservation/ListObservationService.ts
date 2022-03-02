import { countPages, paginate } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'
import { v4 as createUuid } from 'uuid'

import {
  IListObservationRequestDTO,
  IListObservationResponseDTO,
} from '../../dtos/IListObservationDTO'
import { IObservationRhaListViewRepository } from '../../repositories/IObservationRhaListViewRepository'
import { IObservationRqaViewRepository } from '../../repositories/IObservationRqaViewRepository'

@injectable()
export class ListObservationService {
  constructor(
    @inject('ObservationRhaListViewRepository')
    private observationRhaListViewRepository: IObservationRhaListViewRepository,
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
    let repository:
      | IObservationRhaListViewRepository
      | IObservationRqaViewRepository
    let response = []
    if (filters.network.length > 0) {
      if (filters.network[0] === 'RQA') {
        repository = this.observationRqaViewRepository
      } else {
        repository = this.observationRhaListViewRepository
      }

      response = await repository.listObservations(
        filters,
        frequency,
        stationCode
      )
    } else {
      const responseRha =
        await this.observationRhaListViewRepository.listObservations(
          filters,
          frequency,
          stationCode
        )

      const responseRqa =
        await this.observationRqaViewRepository.listObservations(
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
