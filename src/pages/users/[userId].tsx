import Head from 'next/head'
import { useRouter } from 'next/router'

import { Header } from '@/components'
import { PostFeed } from '@/components/posts'
import { ClipLoader } from '@/components/spinners'
import { UserBio, UserHero } from '@/components/users'
import { useUser } from '@/hooks'




export default function UserView () {
  const router = useRouter()
  const { user, isLoading, error } = useUser(router.query.userId as string)

  if (isLoading && !error) {
    return (
      <div className='flex justify-center items-center h-full border-sky-200 w-20 mx-auto'>
        <ClipLoader />
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <Head>
          <title>Not found / Twitter</title>
        </Head>
        <Header label='Go Back' showBackArrow />
        <h1 className='text-2xl text-center p-8'>No user found</h1>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{user.name} / Twitter</title>
      </Head>
      <Header label={user.name as string} showBackArrow />
      <UserHero userId={user.id} />
      <UserBio userId={user.id} />
      <PostFeed userId={user.id} />
    </>
  )
}
