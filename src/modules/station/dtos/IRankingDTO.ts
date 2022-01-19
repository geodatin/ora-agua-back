interface IRankingDTO {
  x: string[]
  series: { id: string; data: number[] }[]
  position: number[]
  pages: number
}

export { IRankingDTO }
