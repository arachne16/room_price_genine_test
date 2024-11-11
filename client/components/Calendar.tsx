import React, { useState } from 'react'

import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns'
import { IconX } from '@tabler/icons-react'
import { LoadingOverlay, Notification, rem } from '@mantine/core'

import Header from './Header'
import DayCell, { DayCellWithNoInfo } from './DayCell'

import { formatDate } from '../utils'
import { grayText } from '../common/forms'
import { usePriceData, useSettingsData } from '../hooks'

/**
 * Component: Calendar
 */
const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // fetch: price data for the current month
  const {
    data: priceData,
    isLoading: loadingPrices,
    error: priceError,
  } = usePriceData()
  // fetch: hotel configuration data
  const {
    data: settingsData,
    isLoading: loadingSettings,
    error: settingsError,
  } = useSettingsData()

  /**
   * Component: Error message in case of no data
   */
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />

  if (priceError || settingsError)
    return (
      <>
        {priceError && (
          <Notification icon={xIcon} color="red" title={priceError.name}>
            {priceError ? priceError.message : ''}
          </Notification>
        )}
        {settingsError && (
          <Notification
            icon={xIcon}
            color="red"
            title={settingsError.name}
            className="mt-4"
          >
            {settingsError ? settingsError.message : ''}
          </Notification>
        )}
      </>
    )

  if (!priceData || !settingsData) {
    return (
      <Notification
        icon={xIcon}
        color="red"
        title="No data available"
      ></Notification>
    )
  }
  /**
   * Component: Error message ends
   */

  const { prices, currency } = priceData!
  const { locale } = settingsData!.hotel // timezone

  // Calc the days of the month
  const startOfMonthDate = startOfMonth(currentMonth)
  const endOfMonthDate = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({
    start: startOfMonthDate,
    end: endOfMonthDate,
  })

  // func: handle month change
  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) =>
      direction === 'next' ? addMonths(prev, 1) : addMonths(prev, -1)
    )
  }

  const dateTillMonths = format(currentMonth, 'MMMM yyyy')

  return (
    <div className="bg-gray-100 min-w-[1300px]">
      <Header
        target="80%"
        expected="61%"
        occupancy="88%"
        month={dateTillMonths}
        onCurrent={() => setCurrentMonth(new Date())}
        onPrev={() => handleMonthChange('prev')}
        onNext={() => handleMonthChange('next')}
      />

      <div className="px-24 py-8 grid gap-2 grid-cols-7 text-left">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
          <div key={day} className="text-lg font-semibold">
            {grayText(day, 'font-medium')}
          </div>
        ))}

        {loadingPrices || loadingSettings ? (
          <LoadingOverlay visible />
        ) : (
          daysInMonth.map((day) => {
            const dateByLocale = formatDate(day, locale)
            const formattedDay = format(day, 'yyyy-MM-dd')
            const dayPrices = prices.data[formattedDay]

            if (!prices.data[formattedDay])
              return (
                <DayCellWithNoInfo key={day.toISOString()} day={dateByLocale} />
              )

            const roomNo = Object.keys(dayPrices)[0]
            const roomPrice = dayPrices[roomNo].price
            const priceInPMS = dayPrices[roomNo].price_in_pms
            const hasError = dayPrices[roomNo].error
            const errorReason = dayPrices[roomNo].error_reason

            return (
              <div key={day.toISOString()}>
                <DayCell
                  day={dateByLocale}
                  priceInPMS={priceInPMS}
                  price={roomPrice}
                  currency={currency}
                  locale={locale}
                  hasError={hasError}
                  errorReason={errorReason}
                />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
/**
 * Component: Calendar ends
 */

export default Calendar
