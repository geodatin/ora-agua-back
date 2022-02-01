export const variables = [
  {
    value: 'ph',
    type: 'variable',
    name: 'pH',
  },
  {
    value: 'OD',
    type: 'variable',
    name: 'Oxigênio Dissolvido',
  },
  {
    value: 'electricConductivity',
    type: 'variable',
    name: 'Codutividade Elétrica',
  },
  {
    value: 'turbidity',
    type: 'variable',
    name: 'Turbidez',
  },
  {
    value: 'sampleTemperature',
    type: 'variable',
    name: 'Temperatura',
  },
  {
    value: 'totalDissolvedSolid',
    type: 'variable',
    name: 'Sólidos Dissolvidos Totais',
  },
  {
    value: 'totalNitrogen',
    type: 'variable',
    name: 'Nitrogênio Total',
  },
  {
    value: 'totalOrtophosphate',
    type: 'variable',
    name: 'Ortofosfato Total',
  },
  {
    value: 'totalSuspensionSolid',
    type: 'variable',
    name: 'Sólidos Suspensos Totais',
  },
  {
    value: 'rain',
    type: 'variable',
    name: 'Precipitação',
  },
  {
    value: 'flowRate',
    type: 'variable',
    name: 'Vazão',
  },
  {
    value: 'adoptedLevel',
    type: 'variable',
    name: 'Nível',
  },
]

export function getVariableName(value: string): string {
  const variable = variables.find((v) => v.value === value)
  return variable.name
}
