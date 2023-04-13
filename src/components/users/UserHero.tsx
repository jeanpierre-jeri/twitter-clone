import { useUser } from '@/hooks'
import Image from 'next/image'

interface UserHeroProps {
  userId: string
}

export function UserHero({ userId }: UserHeroProps) {
  const { user } = useUser(userId)
  return (
    <div>
      <picture className='bg-neutral-700 h-44 relative block'>
        {user?.coverImage && (
          <Image src={user.coverImage} fill alt={`Cover Image of ${user.name}`} className='object-cover' />
        )}
      </picture>
    </div>
  )
}
