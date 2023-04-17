import Head from 'next/head'

import { Header } from '@/components'



export default function Home () {
  return (
    <>
      <Head>
        <title>Home / Twitter</title>
      </Head>
      <Header label='Home' />
    </>
  )
}
