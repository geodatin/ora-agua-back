import { paginate, countPages } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'
import { v4 as createUuid } from 'uuid'

import { IGetNotificationsRequestDTO } from '../../dtos/IGetNotificationsDTO'
import { IGetStationsResponseDTO } from '../../dtos/IGetStationsDTO'
import { INotification } from '../../interfaces/INotification'
import { IStationViewRepository } from '../../repositories/IStationViewRepository'
import moment from 'moment'

@injectable()
export class GetNotificationsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) { }

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
        let inferiorLimit, superiorLimit
        if (notificationType === 'rain') {
          inferiorLimit = limits[`${notificationType}Limits`].inferiorLimit
          superiorLimit = limits[`${notificationType}Limits`].superiorLimit
        } else {
          inferiorLimit = station[`${notificationType}Limits`].inferiorLimit
          superiorLimit = station[`${notificationType}Limits`].superiorLimit
        }

        const notification = this.generateNotification(
          station,
          notificationType,
          inferiorLimit,
          superiorLimit
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
    inferiorLimit: number,
    superiorLimit: number
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
    const isLast30Days = moment(station.lastUpdate).isAfter(
      moment().subtract(30, 'days')
    )
    if (type !== 'rain' && station[type] && isLast30Days) {

      if (station[type] < inferiorLimit && inferiorLimit) {
        console.log(station, type, inferiorLimit, superiorLimit)
        notification.situation = 'alert'
      } else if (station[type] > superiorLimit && superiorLimit) {
        console.log(station, type, inferiorLimit, superiorLimit)
        notification.situation = 'emergency'
      }
    }

    return notification
  }
}
