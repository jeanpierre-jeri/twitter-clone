import { useRouter } from 'next/router'
import { Header } from '@/components'
import { ClipLoader } from '@/components/spinners'
import { useUser } from '@/hooks'
import Head from 'next/head'
import { UserHero } from '@/components/users'

export default function UserView() {
  const router = useRouter()
  const { userId } = router.query
  const { user, isLoading } = useUser(userId as string)

  if (isLoading || !user) {
    return (
      <div className='flex justify-center items-center h-full border-sky-200 w-20 mx-auto'>
        <ClipLoader />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{user.name} / Twitter</title>
      </Head>
      <Header label={user.name as string} showBackArrow />
      <UserHero userId={user.id} />
    </>
  )
}
