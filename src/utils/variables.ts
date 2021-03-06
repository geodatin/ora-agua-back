export const variables = [
  {
    value: 'ph',
    type: 'variable',
    namePT: 'pH',
    nameEN: 'pH',
    nameES: 'pH',
  },
  {
    value: 'OD',
    type: 'variable',
    namePT: 'Oxigênio Dissolvido',
    nameEN: 'Dissolved Oxigen',
    nameES: 'Oxígeno Disuelto',
  },
  {
    value: 'electricConductivity',
    type: 'variable',
    namePT: 'Codutividade Elétrica',
    nameEN: 'Electric Conductivity',
    nameES: 'Conductividad Eléctrica',
  },
  {
    value: 'turbidity',
    type: 'variable',
    namePT: 'Turbidez',
    nameEN: 'Turbidity',
    nameES: 'Turbiedad',
  },
  {
    value: 'sampleTemperature',
    type: 'variable',
    namePT: 'Temperatura',
    nameEN: 'Temperature',
    nameES: 'Temperatura',
  },
  {
    value: 'totalDissolvedSolid',
    type: 'variable',
    namePT: 'Sólidos Dissolvidos Totais',
    nameEN: 'Total Dissolved Solid',
    nameES: 'Sólidos Disueltos Totales',
  },
  {
    value: 'totalNitrogen',
    type: 'variable',
    namePT: 'Nitrogênio Total',
    nameEN: 'Total Nitrogen',
    nameES: 'Nitrógeno total',
  },
  {
    value: 'totalOrtophosphate',
    type: 'variable',
    namePT: 'Ortofosfato Total',
    nameEN: 'Total Ortophosphate',
    nameES: 'Ortofosfato Total',
  },
  {
    value: 'totalSuspensionSolid',
    type: 'variable',
    namePT: 'Sólidos Suspensos Totais',
    nameEN: 'Total Suspension Solid',
    nameES: 'Solidos Suspendidos Totales',
  },
  {
    value: 'rain',
    type: 'variable',
    namePT: 'Precipitação',
    nameEN: 'Rain',
    nameES: 'Lluvia',
  },
  {
    value: 'flowRate',
    type: 'variable',
    namePT: 'Vazão',
    nameEN: 'Flow Rate',
    nameES: 'Tasa de Flujo',
  },
  {
    value: 'level',
    type: 'variable',
    namePT: 'Nível',
    nameEN: 'Level',
    nameES: 'Nivel',
  },
]

export function getVariableName(value: string): string {
  const variable = variables.find((v) => v.value === value)
  return variable.nameEN
}
