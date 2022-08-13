import type { AppProps } from 'next/app'
import { NextComponentType, NextPageContext } from 'next'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientConfig, QueryClientProvider } from 'react-query'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import { AccountLayout, PageLayout } from 'components/layouts'
import { Notifications } from 'components'

import { AuthProvider } from 'providers'

import { GlobalStyles, muiTheme } from 'styled'
import 'public/fonts/fonts.css'
import 'swiper/css'

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    }
  }
}

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig))

  const withLayout = (
    Component: NextComponentType<NextPageContext, any, {}>,
    pageProps: any,
    currentPathname: string
  ) => {
    const accountPathnames = ['/customer', '/supplier', '/manager']
    const withoutLayoutPathnames = ['/']
    const component = <Component {...pageProps} />

    if (accountPathnames.some((pathname) => currentPathname.startsWith(pathname))) {
      return <AccountLayout>{component}</AccountLayout>
    }

    if (withoutLayoutPathnames.some((pathname) => pathname === currentPathname)) {
      return component
    }

    return <PageLayout>{component}</PageLayout>
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <GlobalStyles />

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider>{withLayout(Component, pageProps, router.pathname)}</AuthProvider>
        </Hydrate>
      </QueryClientProvider>

      <Notifications />
    </MuiThemeProvider>
  )
}
