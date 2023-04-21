import { signOut, useSession } from 'next-auth/react'
import { useMemo } from 'react'

import { LogOutIcon, BellIcon, HouseIcon, UserIcon } from '@/components'
import { useUser } from '@/hooks'
import { SidebarLogo, SidebarItem, SidebarTweetButton } from '@/layouts'




export function Sidebar () {
  const { status, data: session } = useSession()
  const { user } = useUser(session?.user.id as string)

  const items = useMemo(() => {
    return [
      {
        label: 'Home',
        href: '/',
        icon: <HouseIcon />,
        auth: false,
        alert: false
      },
      {
        label: 'Notifications',
        href: '/notifications',
        icon: <BellIcon />,
        auth: true,
        alert: user?.hasNotification
      },
      {
        label: 'Profile',
        href: `/users/${user?.id as string}`,
        icon: <UserIcon />,
        auth: true,
        alert: false
      }
    ]
  }, [user?.id, user?.hasNotification])

  return (
    <aside className='col-span-1 min-h-screen pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {items.map(({ href, icon, label, auth, alert }) => (
            <SidebarItem
              key={href}
              href={href}
              label={label}
              icon={icon}
              auth={auth}
              alert={alert ?? false}
            />
          ))}

          {status === 'authenticated' && <SidebarItem onClick={async () => signOut()} icon={<LogOutIcon />} label='Logout' />}
          <SidebarTweetButton />
        </div>
      </div>
    </aside>
  )
}
