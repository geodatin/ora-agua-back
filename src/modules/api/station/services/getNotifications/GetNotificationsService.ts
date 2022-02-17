import { paginate, countPages } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'
import { v4 as createUuid } from 'uuid'

import { IGetNotificationsRequestDTO } from '../../dtos/IGetNotificationsDTO'
import { IGetStationsResponseDTO } from '../../dtos/IGetStationsDTO'
import { INotification } from '../../interfaces/INotification'
import { IStationViewRepository } from '../../repositories/IStationViewRepository'

@injectable()
export class GetNotificationsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute({
    filters,
    page,
    pageSize,
    limits: { rainLimits, levelLimits, flowRateLimits },
  }: IGetNotificationsRequestDTO) {
    const stations = await this.stationViewRepository.getStations({
      filters,
    })

    const notifications: INotification[] = []
    stations.forEach((station) => {
      let rainNotification = null
      let levelNotification = null
      let flowRateNotification = null

      if (rainLimits?.length > 0) {
        const [alertLimit, attentionLimit] = rainLimits
        rainNotification = this.generateNotification(
          station,
          'rain',
          alertLimit,
          attentionLimit
        )
      } else {
        rainNotification = this.generateNotification(station, 'rain', 10, 5)
      }

      if (levelLimits?.length > 0) {
        const [alertLimit, attentionLimit] = levelLimits
        levelNotification = this.generateNotification(
          station,
          'rain',
          alertLimit,
          attentionLimit
        )
      } else {
        levelNotification = this.generateNotification(
          station,
          'level',
          1000,
          800
        )
      }

      if (flowRateLimits?.length > 0) {
        const [alertLimit, attentionLimit] = flowRateLimits
        flowRateNotification = this.generateNotification(
          station,
          'rain',
          alertLimit,
          attentionLimit
        )
      } else {
        flowRateNotification = this.generateNotification(
          station,
          'flowRate',
          2000,
          1500
        )
      }

      if (rainNotification) notifications.push(rainNotification)
      if (levelNotification) notifications.push(levelNotification)
      if (flowRateNotification) notifications.push(flowRateNotification)
    })

    return {
      values: paginate(notifications, page, pageSize),
      pages: countPages(notifications, pageSize),
      total: notifications.length,
    }
  }

  private generateNotification(
    station: IGetStationsResponseDTO,
    type: string,
    alertLimit: number,
    attentionLimit: number
  ) {
    const notification = {
      id: createUuid(),
      code: station.code,
      name: station.name,
      responsible: station.responsible,
      location: station.location,
      situation: null,
      type: type === 'level' ? 'adoptedLevel' : type,
      value: station[type],
      lastUpdate: station.lastUpdate,
      network: station.network,
    }
    if (station[type] > alertLimit) {
      notification.situation = 'alert'
    } else if (station[type] > attentionLimit) {
      notification.situation = 'emergency'
    } else {
      notification.situation = 'normal'
    }
    return notification
  }
}
