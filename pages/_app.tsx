import type { AppProps } from 'next/app'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from 'react-query'

import { Notifications } from 'components'

import { queryClient } from 'core'
import { AuthProvider } from 'providers/auth'

import { GlobalStyles, muiTheme } from 'styled'
import 'public/fonts/fonts.css'
import 'swiper/css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <GlobalStyles />

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>

        <Notifications />
      </QueryClientProvider>
    </MuiThemeProvider>
  )
}

export default MyApp
