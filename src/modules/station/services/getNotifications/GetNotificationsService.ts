import { IGetNotificationsRequestDTO } from '@modules/station/dtos/IGetNotificationsDTO'
import { IGetStationsResponseDTO } from '@modules/station/dtos/IGetStationsDTO'
import { INotification } from '@modules/station/interfaces/INotification'
import { IStationViewRepository } from '@modules/station/repositories/IStationViewRepository'
import { paginate, countPages } from '@utils/paginate'
import { inject, injectable } from 'tsyringe'
import { v4 as createUuid } from 'uuid'

@injectable()
export class GetNotificationsService {
  constructor(
    @inject('StationViewRepository')
    private stationViewRepository: IStationViewRepository
  ) {}

  async execute({ filters, page, pageSize }: IGetNotificationsRequestDTO) {
    const stations = await this.stationViewRepository.getStations({
      filters,
    })

    const notifications: INotification[] = []

    stations.forEach((station) => {
      const rainNotification = this.generateNotification(station, 'rain', 10, 5)
      const levelNotification = this.generateNotification(
        station,
        'level',
        1000,
        800
      )
      const flowRateNotification = this.generateNotification(
        station,
        'flowRate',
        2000,
        1500
      )
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
    let notification: INotification = null
    if (station[type] > alertLimit) {
      notification = {
        id: createUuid(),
        code: station.code,
        name: station.name,
        responsible: station.responsible,
        location: station.location,
        situation: 'alert',
        type: type === 'level' ? 'adoptedLevel' : type,
        value: station[type],
        lastUpdate: station.lastUpdate,
      }
    } else if (station[type] > attentionLimit) {
      notification = {
        id: createUuid(),
        code: station.code,
        name: station.name,
        responsible: station.responsible,
        location: station.location,
        situation: 'attention',
        type: type === 'level' ? 'adoptedLevel' : type,
        value: station[type],
        lastUpdate: station.lastUpdate,
      }
    }
    return notification
  }
}
