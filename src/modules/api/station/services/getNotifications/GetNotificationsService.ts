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
    limits,
  }: IGetNotificationsRequestDTO) {
    const stations = await this.stationViewRepository.getStations({
      filters,
      isNotification: true,
    })

    const notifications: INotification[] = []
    const notificationTypes = ['rain', 'level', 'flowRate']

    stations.forEach((station) => {
      notificationTypes.forEach((notificationType) => {
        let alertLimit, attentionLimit
        if (notificationType === 'rain') {
          alertLimit = limits[`${notificationType}Limits`].alertLimit
          attentionLimit = limits[`${notificationType}Limits`].attentionLimit
        } else {
          alertLimit = station[`${notificationType}Limits`].alertLimit
          attentionLimit = station[`${notificationType}Limits`].attentionLimit
        }

        const notification = this.generateNotification(
          station,
          notificationType,
          alertLimit,
          attentionLimit
        )
        if (notification.situation) notifications.push(notification)
      })
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
      type: type,
      value: station[type],
      lastUpdate: station.lastUpdate,
      network: station.network,
    }
    if (type === 'rain') {
      if (station[type] > alertLimit) {
        notification.situation = 'alert'
      } else if (station[type] > attentionLimit) {
        notification.situation = 'emergency'
      }
    } else {
      if (station[type] < alertLimit) {
        notification.situation = 'alert'
      } else if (station[type] > attentionLimit) {
        notification.situation = 'emergency'
      }
    }

    return notification
  }
}
