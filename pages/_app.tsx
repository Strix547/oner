import type { AppProps } from 'next/app'
import { NextComponentType, NextPageContext } from 'next'
import { useState, useEffect } from 'react'
import { Hydrate, QueryClient, QueryClientConfig, QueryClientProvider } from 'react-query'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import NProgress from 'nprogress'

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

NProgress.configure({ showSpinner: false })

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig))

  // nprogress loading indicator
  useEffect(() => {
    const handleStart = (url: string) => {
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  const withLayout = (
    Component: NextComponentType<NextPageContext, any, {}>,
    pageProps: any,
    currentPathname: string
  ) => {
    const accountPathnames = ['/customer', '/supplier', '/manager']

    const withoutLayoutPathnames = [
      '/',
      '/original-spare-parts/models',
      '/non-original-spare-parts'
    ]

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
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>

      <GlobalStyles injectFirst />

      <MuiThemeProvider theme={muiTheme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <AuthProvider>{withLayout(Component, pageProps, router.pathname)}</AuthProvider>
          </Hydrate>
        </QueryClientProvider>

        <Notifications />
      </MuiThemeProvider>
    </>
  )
}
