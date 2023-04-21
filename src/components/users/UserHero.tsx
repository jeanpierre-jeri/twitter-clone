import Image from 'next/image'

import { Avatar, NoImageIcon } from '@/components'
import { useUser } from '@/hooks'



type UserHeroProps = {
  userId: string
}

export function UserHero ({ userId }: UserHeroProps) {
  const { user } = useUser(userId)

  return (
    <section>
      <div className='bg-neutral-700 h-44 relative'>
        {user?.coverImage
          ? (
            <Image
              src={user.coverImage}
              fill
              alt={`Cover Image of ${user?.name ?? 'User'}`}
              className='object-cover brightness-90'
            />
            )
          : (
            <div className='absolute inset-0 flex justify-center items-center'>
              <i className='w-24 text-neutral-500 pointer-events-none'>
                <NoImageIcon />
              </i>
            </div>
            )}

        <div className='absolute -bottom-16 left-4 '>
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </section>
  )
}
