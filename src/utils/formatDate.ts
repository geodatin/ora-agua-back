export function formatDate(date: string): string {
  const [day, month, year] = date.split('/')
  return `${year}-${month}-${day}`
}

export function formatDateSenhami(date: string): string {
  const [year, month, day] = date.split('/')
  return `${year}-${month}-${day}`
}

export function formatDateCsvs(date: string): string {
  const [day, month, year] = date.split('/')
  return day === '01' ? `${year}-${month}-01` : null
}
