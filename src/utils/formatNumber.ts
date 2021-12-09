export function formatNumber(number: string): number {
  return number === '' ? null : Number(number.replace(',', '.'))
}
