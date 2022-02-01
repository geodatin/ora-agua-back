import { getVariableName } from '@utils/variables'
import { Request, Response } from 'express'
import json2csv from 'json2csv'
import { container } from 'tsyringe'

import { CountStationsByVariableService } from './CountStationsByVariableService'

class CountStatitonsByVariableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filters } = request.body
    const { format } = request.query

    const countStationsByVariableService = container.resolve(
      CountStationsByVariableService
    )

    const count = await countStationsByVariableService.execute(filters)

    if (format === 'csv') {
      const csvValues = count.map((c) => {
        return {
          network: c.network,
          variable: getVariableName(c.variable),
          stations: c.stations,
        }
      })
      const csv = json2csv.parse(csvValues)
      return response.attachment('variable.csv').status(200).send(csv)
    }

    return response.json(count)
  }
}

export { CountStatitonsByVariableController }
