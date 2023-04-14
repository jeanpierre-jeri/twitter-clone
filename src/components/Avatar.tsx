import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@/hooks'

interface AvatarProps {
  userId: string
  isLarge?: boolean
  hasBorder?: boolean
}

export function Avatar({ userId, hasBorder = false, isLarge = false }: AvatarProps) {
  const { user } = useUser(userId)

  return (
    <Link
      href={`/users/${userId}`}
      onClick={(e) => e.stopPropagation()}
      className={`
      aspect-square rounded-full  transition-opacity relative block
      ${hasBorder ? 'border-4 border-black' : ''} 
      ${isLarge ? 'w-32' : 'w-12 hover:opacity-90'}`}
    >
      <Image
        fill
        className='object-cover rounded-full'
        alt='Avatar'
        src={user?.profileImage || '/images/placeholder.webp'}
        priority
      />
    </Link>
  )
}
