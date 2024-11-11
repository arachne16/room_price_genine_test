import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { PriceData, SettingsData } from '../../types'
import { getPrices, getSettings } from '../utils/api'

export const usePriceData = (): UseQueryResult<PriceData> => {
  return useQuery<PriceData>({ queryKey: ['priceData'], queryFn: getPrices })
}

export const useSettingsData = (): UseQueryResult<SettingsData> =>
  useQuery<SettingsData>({
    queryKey: ['settingsData'],
    queryFn: getSettings,
  })
