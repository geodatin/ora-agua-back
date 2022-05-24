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
      const responseRhaPromise =
        this.observationRhaListViewRepository.listObservations(
          filters,
          frequency,
          stationCode
        )

      const responseRqaPromise =
        this.observationRqaViewRepository.listObservations(
          filters,
          frequency,
          stationCode
        )

      const responseHybamPromise =
        this.observationHybamRepository.listObservations(
          filters,
          frequency,
          stationCode
        )

      const [responseRha, responseRqa, responseHybam] = await Promise.all([
        responseRhaPromise,
        responseRqaPromise,
        responseHybamPromise,
      ])

      response = responseRha
        .concat(responseRqa)
        .concat(responseHybam)
        .sort(() => Math.random() - 0.5)
    }
    const newObservations: IListObservationResponseDTO[] = []

    response.forEach((observation: IListObservationResponseDTO) => {
      observation.observations = []
      observation.id = createUuid()
      const allNullValues = true
      for (const key in observation) {
        if (key.toString().includes('observations_')) {
          /*           if (observation[key]) {
            allNullValues = false
          } */
          const newKey = key.split('_')[1]
          if (filters.network[0] === 'RHA' && frequency !== 'last') {
            if (newKey === 'rain') {
              observation.observations.push({
                key: newKey,
                value: observation[key],
                mode: 'sum',
              })
            } else {
              observation.observations.push({
                key: newKey,
                value: observation[key],
                mode: 'avg',
              })
            }
          } else {
            observation.observations.push({
              key: newKey,
              value: observation[key],
              mode: 'last',
            })
          }

          delete observation[key]
        }
      }
      // if (!allNullValues) {
      newObservations.push(observation)
      // }
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
