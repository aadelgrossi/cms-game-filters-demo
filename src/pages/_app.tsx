import { FC } from 'react'

import { NextUIProvider, createTheme } from '@nextui-org/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'urql'

import client from '~/lib/client'

const darkTheme = createTheme({
  type: 'dark'
})

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <NextUIProvider theme={darkTheme}>
      <Provider value={client}>
        <Head>
          <title>Next.js Starter with NextUI</title>
          <meta
            name="Description"
            content="A Next.js starter configured with NextUI"
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </NextUIProvider>
  )
}

export default MyApp
