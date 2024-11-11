export type DayCellWithNoInfoT = { day: string }

export type DayCellT = {
  day: string
  priceInPMS: number
  price: number
  currency: {
    symbol: string
    code: string
  }
  locale: string
  hasError: boolean
  errorReason: string
}

export type HeaderT = {
  month: string
  occupancy: number | string
  expected: number | string
  target: number | string
  onCurrent: () => void
  onPrev: () => void
  onNext: () => void
}
