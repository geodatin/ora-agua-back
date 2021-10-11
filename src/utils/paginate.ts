export function paginate(values: any[], page: number, pageSize: number): any[] {
  const offset = (page - 1) * pageSize
  const pageValues = values.slice(offset, offset + pageSize)
  return pageValues
}

export function countPages(values: any[], pageSize: number) {
  return Math.ceil(values.length / pageSize)
}
