import { Point } from 'geojson'
import { ViewColumn, ViewEntity } from 'typeorm'

@ViewEntity({
  name: 'station_view',
  materialized: true,
  expression: `
    select stations.*, countries.name as country, countries.id as country_id
    from
    (
      (select code, name, type, river, location, 'hybam' as responsible from station_hybam)
      UNION
      (select code::varchar, name, type, river,  location, responsible from station_ana)
      UNION
      (select code, name, null as type, river, geometry as location, 'ideam' as responsible from station_ideam)
      UNION
      (select code, name, null as type, river, geometry as location, 'sinca' as responsible from station_sinca)
      UNION
      (select code, name, null as type, river, location, 'senhami' as responsible from station_senhami)
      UNION
      (select code, name, type, river, location, 'senhami' as responsible from station_senhami_pe)
    ) as stations,
      south_america_country as countries
    where ST_Contains(countries.geometry, stations.location)
  `,
})
class StationView {
  @ViewColumn()
  code: string

  @ViewColumn()
  name: string

  @ViewColumn()
  location: Point

  @ViewColumn()
  type: string

  @ViewColumn()
  river: string

  @ViewColumn()
  responsible: string

  @ViewColumn()
  country: string

  @ViewColumn({ name: 'country_id' })
  countryId: number
}

export { StationView }
