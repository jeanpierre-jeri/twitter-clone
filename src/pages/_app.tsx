import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'

import type { AppProps } from 'next/app'

import { Layout } from '@/layouts'
import { fetcher } from '@/lib/fetcher'

import '@/styles/globals.css'



export default function App ({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={{ fetcher, shouldRetryOnError: false }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  )
}
