import { inject, injectable } from 'tsyringe'

import { ITimeSeriesDTO } from '../../dtos/ITimeSeriesDTO'
import { ITimeSeriesRqaDTO } from '../../dtos/ITimeSeriesRqaDTO'
import { NetworkTypeError } from '../../errors/NetworkTypeError'
import { TimeSeriesMapper } from '../../mappers/TimeSeriesMapper'
import { IObservationHybamRepository } from '../../repositories/IObservationHybamRepository'
import { IObservationRhaViewRepository } from '../../repositories/IObservationRhaViewRepository'
import { IObservationRqaViewRepository } from '../../repositories/IObservationRqaViewRepository'
import { FrequencyType } from '../../types/FrequencyType'

@injectable()
class TimeSeriesService {
  constructor(
    @inject('ObservationRhaViewRepository')
    private observationRhaViewRepository: IObservationRhaViewRepository,
    @inject('ObservationRqaViewRepository')
    private observationRqaViewRepository: IObservationRqaViewRepository,
    @inject('ObservationHybamRepository')
    private observationHybamRepository: IObservationHybamRepository
  ) {}

  async execute(
    stationCode: string,
    dataType: string,
    frequency: FrequencyType,
    network: string,
    format?: string
  ): Promise<ITimeSeriesDTO | ITimeSeriesRqaDTO | string> {
    let observations = null
    if (dataType === 'raw') {
      if (network === 'rha') {
        observations = await this.observationRhaViewRepository.timeSeriesRaw(
          stationCode,
          frequency
        )
      } else if (network === 'rqa') {
        observations = await this.observationRqaViewRepository.timeSeriesRaw(
          stationCode,
          frequency
        )
      } else if (network === 'hybam') {
        observations = await this.observationHybamRepository.timeSeriesRaw(
          stationCode
        )
      } else {
        throw new NetworkTypeError()
      }
    } else {
      if (network === 'rha') {
        observations = await this.observationRhaViewRepository.timeSeries(
          stationCode,
          frequency,
          dataType
        )
      } else if (network === 'rqa') {
        observations = await this.observationRqaViewRepository.timeSeries(
          stationCode,
          frequency,
          dataType
        )
      } else if (network === 'hybam') {
        observations = await this.observationHybamRepository.timeSeries(
          stationCode,
          dataType
        )
      } else {
        throw new NetworkTypeError()
      }
    }

    if (format === 'csv') {
      return TimeSeriesMapper.toCSV(observations, dataType, network)
    }

    return TimeSeriesMapper.toDTO(observations, dataType, network)
  }
}

export { TimeSeriesService }
