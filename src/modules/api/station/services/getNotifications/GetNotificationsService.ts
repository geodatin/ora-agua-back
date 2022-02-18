import { paginate, countPages } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'
import { v4 as createUuid } from 'uuid'

import { IGetNotificationsRequestDTO } from '../../dtos/IGetNotificationsDTO'
import { IGetStationsResponseDTO } from '../../dtos/IGetStationsDTO'
import { IStationViewRepository } from '../../repositories/IStationViewRepository'
import { INotification } from './interfaces/INotification'

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
    })

    const notifications: INotification[] = []
    const notificationTypes = ['rain', 'level', 'flowRate']

    stations.forEach((station) => {
      notificationTypes.forEach((notificationType) => {
        const [alertLimit, attentionLimit] = limits[`${notificationType}Limits`]
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
      type: type === 'level' ? 'adoptedLevel' : type,
      value: station[type],
      lastUpdate: station.lastUpdate,
      network: station.network,
    }
    if (station[type] > alertLimit) {
      notification.situation = 'alert'
    } else if (station[type] > attentionLimit) {
      notification.situation = 'emergency'
    }
    return notification
  }
}
