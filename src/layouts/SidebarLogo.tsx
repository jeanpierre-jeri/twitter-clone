import { TwitterIcon } from '@/components'
import Link from 'next/link'

export function SidebarLogo() {
  return (
    <Link
      href='/'
      className='rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300/10 transition-colors text-white'
    >
      <TwitterIcon />
    </Link>
  )
}
