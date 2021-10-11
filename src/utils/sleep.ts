export function sleep(delay: number): void {
  const start = new Date().getTime()
  while (new Date().getTime() < start + delay);
}
