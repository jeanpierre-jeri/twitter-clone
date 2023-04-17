import { LogOutIcon } from '@/components'
import { SidebarLogo, SidebarItem, SidebarTweetButton } from '@/layouts'
import { signOut, useSession } from 'next-auth/react'
import { BellIcon, HouseIcon, UserIcon } from '@/components'
import { useMemo } from 'react'

export function Sidebar() {
  const { status, data: session } = useSession()

  const items = useMemo(() => {
    return [
      {
        label: 'Home',
        href: '/',
        icon: <HouseIcon />,
        auth: false
      },
      {
        label: 'Notifications',
        href: '/notifications',
        icon: <BellIcon />,
        auth: true
      },
      {
        label: 'Profile',
        href: `/users/${session?.user.id}`,
        icon: <UserIcon />,
        auth: true
      }
    ]
  }, [session?.user.id])

  return (
    <aside className='col-span-1 min-h-screen pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {items.map(({ href, icon, label, auth }) => (
            <SidebarItem key={href} href={href} label={label} icon={icon} auth={auth} />
          ))}

          {status === 'authenticated' && <SidebarItem onClick={() => signOut()} icon={<LogOutIcon />} label='Logout' />}
          <SidebarTweetButton />
        </div>
      </div>
    </aside>
  )
}
