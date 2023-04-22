import Head from 'next/head'
import { useSession } from 'next-auth/react'

import { Header, Form } from '@/components'
import { PostFeed } from '@/components/posts'



export default function Home () {
  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title>Home / Twitter</title>
      </Head>
      <Header label='Home' />
      <Form placeholder="What's happening?" />
      {!!session && <PostFeed /> }
    </>
  )
}
