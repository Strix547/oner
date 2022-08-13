const currencies = [{ value: 'RUB', symbol: '₽' }]

export const numberToPrice = (price: number, currency: string = 'RUB') => {
  const currencySymbol = currencies.find(({ value }) => value === currency)?.symbol

  return `${price} ${currencySymbol}`
}
