export function avoidNull(value: any): any {
  return value === null || value === undefined ? '' : value
}
