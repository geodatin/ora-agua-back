import { Point } from 'geojson'
import { Column, ViewEntity } from 'typeorm'

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
  @Column()
  code: string

  @Column()
  name: string

  @Column({ type: 'geometry', srid: 4326 })
  location: Point

  @Column()
  type: string

  @Column()
  river: string

  @Column()
  responsible: string

  @Column()
  country: string

  @Column({ name: 'country_id' })
  countryId: number
}

export { StationView }
