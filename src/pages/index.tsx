import Head from 'next/head'

import { Header, Form } from '@/components'
import { PostFeed } from '@/components/posts'



export default function Home () {
  return (
    <>
      <Head>
        <title>Home / Twitter</title>
      </Head>
      <Header label='Home' />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}
