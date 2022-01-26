import { ILastObservationDTO } from '@modules/observation/dtos/ILastObservationDTO'
import { IObservationRepository } from '@modules/observation/repositories/IObservationRepository'
import { countPages, paginate } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'

@injectable()
class LastObservationService {
  constructor(
    @inject('ObservationRepository')
    private observationRepository: IObservationRepository
  ) {}

  async execute({ page, pageSize, frequency }: ILastObservationDTO) {
    const response = await this.observationRepository.getLastObservation(
      frequency
    )
    return {
      values: paginate(response, page, pageSize),
      pages: countPages(response, pageSize),
    }
  }
}

export { LastObservationService }
