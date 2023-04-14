import Image from 'next/image'
import { useUser } from '@/hooks'
import { Avatar } from '@/components'

interface UserHeroProps {
  userId: string
}

export function UserHero({ userId }: UserHeroProps) {
  const { user } = useUser(userId)

  return (
    <section>
      <div className='bg-neutral-700 h-44 relative'>
        {user?.coverImage && (
          <Image src={user.coverImage} fill alt={`Cover Image of ${user.name}`} className='object-cover' />
        )}

        <div className='absolute -bottom-16 left-4 '>
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </section>
  )
}
