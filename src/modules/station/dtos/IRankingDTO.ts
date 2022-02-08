interface IRankingDTO {
  x: string[]
  series: { id: string; data: number[] }[]
  position: number[]
  pages: number
  networks: string[]
}

export { IRankingDTO }
