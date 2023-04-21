import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { Header, NotificationsFeed } from '@/components'




export default function NotificacionePage () {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) void router.push('/')
  }, [router, session])

  if (!session) return null

  return (

    <>
      <Head>
        <title>Notifications / Twitter</title>
      </Head>
      <Header label='Notifications' showBackArrow />
      <NotificationsFeed />
    </>
  )
}
