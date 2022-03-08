import { IFiltersDTO } from '../dtos/IFiltersDTO'
import { IGetFilterOptionsDTO } from '../dtos/IGetFilterOptionsDTO'
import {
  IGetStationsRequestDTO,
  IGetStationsResponseDTO,
} from '../dtos/IGetStationsDTO'
import { IVariablesCountDTO } from '../dtos/IVariablesCountDTO'

interface IStationViewRepository {
  countAllStations(filters: IFiltersDTO): Promise<number>

  countStationsByCountry(
    filters: IFiltersDTO
  ): Promise<{ count: number; country: string; countryId: number }[]>
  countStationsByResponsible(
    filters: IFiltersDTO
  ): Promise<{ count: number; responsible: string }[]>

  countStationsByNetwork(
    filters: IFiltersDTO
  ): Promise<{ count: number; network: string }[]>

  rankingRiversByStations(
    filters: IFiltersDTO,
    order: string
  ): Promise<{ river: string; count: number; network: string }[]>

  getStations(data: IGetStationsRequestDTO): Promise<IGetStationsResponseDTO[]>

  findFilterOptions(
    column: string,
    filterTerm: string
  ): Promise<IGetFilterOptionsDTO[]>

  countStationsByVariable(filters: IFiltersDTO): Promise<IVariablesCountDTO[]>

  getProjectedStations(): Promise<any>
}

export { IStationViewRepository }
