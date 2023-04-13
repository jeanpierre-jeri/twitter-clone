import useSWR from 'swr'
import { type UserWithFollowersCount } from '@/types'

export function useUser(userId: string) {
  const { data, error, isLoading } = useSWR<UserWithFollowersCount>(userId ? `/api/users/${userId}` : null)

  return {
    user: data,
    isLoading,
    error
  }
}
