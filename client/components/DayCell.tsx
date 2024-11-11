import { isToday } from 'date-fns'
import { Badge, Tooltip } from '@mantine/core'
import { IconAlertTriangle, IconTrendingUp } from '@tabler/icons-react'

import { calculatePriceDifference, formatCurrency } from '../utils'
import { grayText } from '../common/forms'
import { DayCellT, DayCellWithNoInfoT } from '../constant/types'

/**
 * Component: DayCellWithNoInfo
 */
export const DayCellWithNoInfo = ({ day }: DayCellWithNoInfoT) => {
  return (
    <Tooltip
      w={220}
      multiline
      radius="md"
      position="bottom"
      transitionProps={{ duration: 200 }}
      label="NO_AVAILABLE_MARKET_DATA"
    >
      <div
        className={`bg-gray-50 hover:bg-purple-100 cursor-pointer rounded-lg px-4 py-2 shadow text-base text-center h-[110px] flex flex-col justify-between`}
      >
        <p className="text-left">{grayText(day)}</p>
        <div className="flex justify-center pb-2">
          <IconAlertTriangle color="purple" size={36} />
        </div>
      </div>
    </Tooltip>
  )
}
/**
 * Component: DayCellWithNoInfo ends
 */

/**
 * Component: DayCell
 */
const DayCell = ({
  day,
  priceInPMS,
  price,
  currency,
  locale,
  hasError,
  errorReason,
}: DayCellT) => {
  const fPrice = formatCurrency(price, currency.code, locale)
  const pmsFPrice = formatCurrency(priceInPMS, currency.code, locale)
  const distinction = calculatePriceDifference(price, priceInPMS).toFixed(2)

  /**
   * Component: BadgedPMSPrice
   */
  const BadgedPMSPrice = () =>
    parseFloat(distinction) >= 4.0 ? (
      <span className="flex rounded-full bg-badgeBgColor text-badgeTextColor">
        <IconTrendingUp />
        {pmsFPrice}
      </span>
    ) : (
      <span>{pmsFPrice}</span>
    )
  /**
   * Component: BadgedPMSPrice ends
   */

  return (
    <Tooltip
      w={220}
      multiline
      radius="md"
      position="bottom"
      transitionProps={{ duration: 200 }}
      label={
        hasError ? (
          errorReason
        ) : (
          <div className="flex flex-col text-sm">
            <span className="text-xs font-light mb-2">Prices</span>
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>{fPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Price in PMS</span>
              <span>{pmsFPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Differences</span>
              <span>{distinction}%</span>
            </div>
          </div>
        )
      }
    >
      <div
        className={`${
          !hasError ? 'bg-white' : 'bg-gray-50'
        } hover:bg-purple-100 cursor-pointer rounded-lg px-4 py-2 shadow text-base text-center h-[110px] flex flex-col justify-between`}
      >
        <div className="flex justify-between">
          <p className="font-semibold text-left">
            {hasError ? grayText(day) : day}
          </p>

          {isToday(day) ? <Badge color="pink">Today</Badge> : ''}
        </div>

        {hasError ? (
          <div className="flex justify-center pb-2">
            <IconAlertTriangle color="purple" size={36} />
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex flex-col justify-end">{distinction}%</div>
            <div className="text-right">
              <p>{fPrice}</p>
              <p className="font-medium">
                <BadgedPMSPrice />
              </p>
            </div>
          </div>
        )}
      </div>
    </Tooltip>
  )
}
/**
 * Component: DayCell ends
 */

export default DayCell
