import { FC } from 'react'

import { NextUIProvider, createTheme } from '@nextui-org/react'
import { AppProps } from 'next/app'
import Head from 'next/head'

const darkTheme = createTheme({
  type: 'dark'
})

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <NextUIProvider theme={darkTheme}>
      <Head>
        <title>Next.js Starter with NextUI</title>
        <meta
          name="Description"
          content="A Next.js starter configured with NextUI"
        />
      </Head>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
