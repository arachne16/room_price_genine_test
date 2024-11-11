import { ActionIcon, Button } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

import { grayText } from '../common/forms'
import { HeaderT } from '../constant/types'

/**
 * Component: Header
 */
const Header = ({
  month,
  occupancy,
  expected,
  target,
  onCurrent,
  onPrev,
  onNext,
}: HeaderT) => {
  return (
    <header className="flex justify-between items-center px-16 py-2 bg-gray-100 shadow">
      <div className="flex items-center space-x-2">
        <button className="text-2xl pb-2 font-bold w-60">{month}</button>

        {/* Navigation buttons start */}
        <ActionIcon
          radius="xl"
          onClick={onPrev}
          className="bg-transparent hover:bg-white hover:shadow hover:text-black text-black"
        >
          <IconChevronLeft />
        </ActionIcon>
        <Button
          radius="xl"
          variant="transparent"
          onClick={onCurrent}
          className="hover:bg-white hover:shadow hover:text-black text-black"
        >
          Current
        </Button>
        <ActionIcon
          radius="xl"
          onClick={onNext}
          className="bg-transparent hover:bg-white hover:shadow hover:text-black text-black"
        >
          <IconChevronRight />
        </ActionIcon>
        {/* Navigation buttons ends */}

        <div className="flex items-center space-x-2 pl-6">
          <button className="text-base bg-gray-200 px-6 py-1 rounded shadow">
            {grayText('Week', 'font-semibold')}
          </button>
          <button className="text-base bg-yellow-400 px-6 py-1 rounded shadow">
            {grayText('Month', 'font-semibold')}
          </button>
        </div>
      </div>

      <div className="flex space-x-4 text-center text-base font-medium">
        <div>
          <p className="bg-white rounded-lg px-2 shadow-md">
            {occupancy}&nbsp; {grayText('Occupancy')}
          </p>
        </div>
        <div>
          <p className="bg-white rounded-lg px-2 shadow-md">
            {expected}&nbsp; {grayText('Expected')}
          </p>
        </div>
        <div>
          <p className="bg-white rounded-lg px-2 shadow-md">
            {target}&nbsp; {grayText('Target')}
          </p>
        </div>
      </div>

      <button className="bg-gray-200 text-base px-3 py-1 rounded shadow font-semibold">
        Admin
      </button>
    </header>
  )
}
/**
 * Component: Header ends
 */

export default Header
