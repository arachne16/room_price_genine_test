export const calculatePriceDifference = (
  price: number,
  priceInPMS: number | null
): number => {
  if (!priceInPMS) return 0
  return (Math.abs(price - priceInPMS) / priceInPMS) * 100
}

export const formatCurrency = (
  amount: number,
  symbol: string,
  locale: string
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: symbol,
  }).format(amount)
}

export const formatDate = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(locale).format(date)
}
