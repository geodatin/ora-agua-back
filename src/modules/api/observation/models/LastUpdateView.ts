import { ViewColumn, ViewEntity } from 'typeorm'

@ViewEntity({
  expression: `SELECT NOW() AS last_update`,
  materialized: true,
  name: 'last_update_view',
  schema: process.env.SCHEMA,
})
export class LastUpdateView {
  @ViewColumn({ name: 'last_update' })
  lastUpdate: Date
}
