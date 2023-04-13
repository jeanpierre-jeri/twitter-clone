import { Header } from '@/components'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home / Twitter</title>
      </Head>
      <Header label='Home' />
    </>
  )
}
