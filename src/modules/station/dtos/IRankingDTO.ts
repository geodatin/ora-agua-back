interface IRankingDTO {
  x: string[]
  datasets: { label: string; data: number[] }[]
  position: number[]
  pages: number
}

export { IRankingDTO }
