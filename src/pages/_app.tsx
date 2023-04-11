import type { AppProps } from 'next/app'
import { Layout } from '@/layouts'
import '@/styles/globals.css'
import { RegisterModal, LoginModal } from '@/components/modals'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <LoginModal />
      <RegisterModal />
    </>
  )
}
