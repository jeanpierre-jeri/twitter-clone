import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

import { Button } from '../Button'
import { CalendarIcon } from '../Icons'

import { useFollow, useUser } from '@/hooks'
import { useStore } from '@/store'



type UserBioProps = {
  userId: string
}

export function UserBio ({ userId }: UserBioProps) {
  const { user } = useUser(userId)
  const { data: session } = useSession()
  const { isFollowing, toggleFollow, isLoading } = useFollow(userId)

  const { openEditModal } = useStore(({ openEditModal }) => ({
    openEditModal
  }))

  const createdAt = useMemo(() => {
    if (!user?.createdAt) return
    const date = new Date(user.createdAt)
    return format(date, 'MMMM yyyy')
  }, [user?.createdAt])

  const isCurrentUser = user?.email === session?.user?.email

  const btnText = useMemo(() => {
    if (isCurrentUser) return 'Edit Profile'

    if (isFollowing) return 'Unfollow'
    return 'Follow'
  }, [isFollowing, isCurrentUser])

  return (
    <section className='border-b border-neutral-800 pb-4'>
      <div className='flex justify-end p-2'>
        <Button disabled={isLoading} secondary={!isFollowing} outline={isFollowing} onClick={isCurrentUser ? openEditModal : toggleFollow}>
          {btnText}
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
            {user?.followersCount ?? 0} <span className='text-neutral-500'>Followers</span>
          </p>
        </div>
      </div>
    </section>
  )
}
