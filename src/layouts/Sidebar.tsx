import { LogOutIcon } from '@/components'
import { ITEMS } from '@/constants'
import { SidebarLogo, SidebarItem, SidebarTweetButton } from '@/layouts'
import { signOut, useSession } from 'next-auth/react'

export function Sidebar() {
  const { status } = useSession()

  return (
    <aside className='col-span-1 min-h-screen pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {ITEMS.map(({ href, icon, label }) => (
            <SidebarItem key={href} href={href} label={label} icon={icon} />
          ))}

          {status === 'authenticated' && <SidebarItem onClick={() => signOut()} icon={<LogOutIcon />} label='Logout' />}
          <SidebarTweetButton />
        </div>
      </div>
    </aside>
  )
}
