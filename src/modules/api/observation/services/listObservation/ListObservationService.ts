import { countPages, paginate } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'
import { v4 as createUuid } from 'uuid'

import {
  IListObservationRequestDTO,
  IListObservationResponseDTO,
} from '../../dtos/IListObservationDTO'
import { IObservationHybamRepository } from '../../repositories/IObservationHybamRepository'
import { IObservationRhaListViewRepository } from '../../repositories/IObservationRhaListViewRepository'
import { IObservationRqaViewRepository } from '../../repositories/IObservationRqaViewRepository'

@injectable()
export class ListObservationService {
  constructor(
    @inject('ObservationRhaListViewRepository')
    private observationRhaListViewRepository: IObservationRhaListViewRepository,
    @inject('ObservationRqaViewRepository')
    private observationRqaViewRepository: IObservationRqaViewRepository,
    @inject('ObservationHybamRepository')
    private observationHybamRepository: IObservationHybamRepository
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
      | IObservationHybamRepository

    let response = []
    if (filters.network.length > 0) {
      if (filters.network[0] === 'RQA') {
        repository = this.observationRqaViewRepository
      } else if (filters.network[0] === 'RHA') {
        repository = this.observationRhaListViewRepository
      } else if (filters.network[0] === 'HYBAM') {
        repository = this.observationHybamRepository
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

      const responseHybam =
        await this.observationHybamRepository.listObservations(
          filters,
          frequency,
          stationCode
        )

      response = responseRha
        .concat(responseRqa)
        .concat(responseHybam)
        .sort(() => Math.random() - 0.5)
    }

    const newObservations: IListObservationResponseDTO[] = []

    response.forEach((observation: IListObservationResponseDTO) => {
      observation.observations = []
      observation.id = createUuid()
      let allNullValues = true
      for (const key in observation) {
        if (key.toString().includes('observations_')) {
          if (observation[key]) {
            allNullValues = false
          }
          const newKey = key.split('_')[1]
          observation.observations.push({
            key: newKey,
            value: observation[key],
          })
          delete observation[key]
        }
      }
      if (!allNullValues) {
        newObservations.push(observation)
      }
    })

    if (stationCode) {
      return newObservations[0]
    }
    return {
      values: paginate(newObservations, page, pageSize),
      pages: countPages(newObservations, pageSize),
      total: newObservations.length,
    }
  }
}
