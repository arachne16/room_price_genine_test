/// <reference types="vinxi/types/client" />
import ReactDOM from 'react-dom/client'

import '@mantine/core/styles.css'
import './index.css'

import { Box, MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RoomPriceGenieLogo } from './roompricegenie-logo'

import Calendar from './components/Calendar'
import DayCell from './components/DayCell'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Box p="sm">
          <RoomPriceGenieLogo />
        </Box>
        {/* TODO: This is where you do your genie magic */}
        <div className="p-4">
          <Calendar />
        </div>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
