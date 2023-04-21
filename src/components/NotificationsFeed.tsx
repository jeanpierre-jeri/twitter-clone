import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { TwitterIcon } from './Icons'

import { useUser } from '@/hooks'
import { useNotifications } from '@/hooks/useNotifications'



export function NotificationsFeed () {
  const { data: session } = useSession()
  const { user, mutate } = useUser(session?.user?.id as string)
  const { notifications = [] } = useNotifications(user?.id as string)

  useEffect(() => {
    void mutate()
  }, [mutate])

  if (notifications?.length === 0) {
    return (
      <h4 className='text-neutral-600 text-center p-6 text-xl'>
        No notifications
      </h4>
    )
  }

  return (
    <ul className='flex flex-col'>
      {notifications.map(notification => (
        <li key={notification.id} className='flex items-center p-6 gap-4 border-b border-neutral-800'>
          <TwitterIcon className='text-white w-8' />
          <p className='text-white'>{notification.body}</p>
        </li>
      ))}
    </ul>
  )
}
