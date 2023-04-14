import { useMemo } from 'react'
import { format } from 'date-fns'
import { useUser } from '@/hooks'
import { Button } from '../Button'
import { useSession } from 'next-auth/react'
import { CalendarIcon } from '../Icons'

interface UserBioProps {
  userId: string
}

export function UserBio({ userId }: UserBioProps) {
  const { user } = useUser(userId)
  const { data: session } = useSession()

  const createdAt = useMemo(() => {
    if (!user?.createdAt) return
    const date = new Date(user.createdAt)
    return format(date, 'MMMM yyyy')
  }, [user?.createdAt])

  return (
    <section className='border-b border-neutral-800 pb-4'>
      <div className='flex justify-end p-2'>
        <Button secondary onClick={() => {}}>
          {user?.email === session?.user?.email ? 'Edit Profile' : 'Follow'}
        </Button>
      </div>
      <div className='mt-8 px-4'>
        <div className='flex flex-col'>
          <h3 className='text-white text-2xl font-semibold'>{user?.name}</h3>
          <p className='text-md text-neutral-500'>@{user?.username}</p>
        </div>
        <p className='text-white mt-4'>{user?.bio}</p>

        <div className='flex items-center gap-2 mt-4 text-neutral-500'>
          <i className='w-6'>
            <CalendarIcon />
          </i>
          <p>Joined {createdAt}</p>
        </div>
        <div className='flex items-center mt-4 gap-6'>
          <p className='text-white'>
            {user?.followingIds?.length} <span className='text-neutral-500'>Following</span>
          </p>

          <p className='text-white'>
            {user?.followersCount || 0} <span className='text-neutral-500'>Followers</span>
          </p>
        </div>
      </div>
    </section>
  )
}
