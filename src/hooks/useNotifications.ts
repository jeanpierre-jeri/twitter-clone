import useSWR from 'swr'

import type { getNotificationsByUserId } from '@/lib/prisma'



type Notifications = Awaited<ReturnType<typeof getNotificationsByUserId>>

export function useNotifications (userId?: string) {
  const url = userId ? `/api/users/${userId}/notifications` : null

  const { data, isLoading, mutate } = useSWR<Notifications>(url)

  return {
    notifications: data,
    isLoading,
    mutate
  }
}
