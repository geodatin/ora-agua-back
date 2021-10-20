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

  async execute({ page }: ILastObservationDTO) {
    const response = await this.observationRepository.getLastObservation()
    return {
      values: paginate(response, page, 5),
      pages: countPages(response, 5),
    }
  }
}

export { LastObservationService }
