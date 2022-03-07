export function log(message: string) {
  console.log(
    `[${new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    })}] ${message}`
  )
}
