import { IFiltersDTO } from '@modules/api/station/dtos/IFiltersDTO'
import { toSnakeCase } from '@utils/toSnakeCase'
import { variables } from '@utils/variables'
import { SelectQueryBuilder } from 'typeorm'

export function applyFilters(
  query: SelectQueryBuilder<any>,
  filters: IFiltersDTO,
  firstWhere: boolean = true
): SelectQueryBuilder<any> {
  if (filters?.country?.length > 0) {
    if (firstWhere) {
      query = query.where('country IN (:...countries)', {
        countries: filters.country,
      })
      firstWhere = false
    } else {
      query = query.andWhere('country IN (:...countries)', {
        countries: filters.country,
      })
    }
  }

  if (filters?.name?.length > 0) {
    if (firstWhere) {
      query = query.where('name IN (:...names)', {
        names: filters.name,
      })
      firstWhere = false
    } else {
      query = query.andWhere('name IN (:...names)', {
        names: filters.name,
      })
    }
  }

  if (filters?.network?.length > 0) {
    if (firstWhere) {
      query = query.where('network IN (:...networks)', {
        networks: filters.network,
      })
      firstWhere = false
    } else {
      query = query.andWhere('network IN (:...networks)', {
        networks: filters.network,
      })
    }
  }

  if (filters?.responsible?.length > 0) {
    if (firstWhere) {
      query = query.where('responsible IN (:...responsibles)', {
        responsibles: filters.responsible,
      })
      firstWhere = false
    } else {
      query = query.andWhere('responsible IN (:...responsibles)', {
        responsibles: filters.responsible,
      })
    }
  }

  if (filters?.river?.length > 0) {
    if (firstWhere) {
      query = query.where('river IN (:...rivers)', {
        rivers: filters.river,
      })
      firstWhere = false
    } else {
      query = query.andWhere('river IN (:...rivers)', {
        rivers: filters.river,
      })
    }
  }

  const variableSet = new Set(variables.map((variable) => variable.value))

  if (filters?.variable?.length > 0) {
    filters.variable.forEach((variable) => {
      if (variableSet.has(variable)) {
        if (variable !== 'OD') {
          variable = toSnakeCase(variable)
        }

        if (firstWhere) {
          query = query.where(
            `station."${
              variable === 'level' ? 'adopted_level' : variable
            }" = true`
          )
          firstWhere = false
        } else {
          query = query.andWhere(
            `station."${
              variable === 'level' ? 'adopted_level' : variable
            }" = true`
          )
        }
      }
    })
  }

  return query
}
