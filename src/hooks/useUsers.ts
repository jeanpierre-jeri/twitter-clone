import useSWR from 'swr'

import { type User } from '@/types'



export function useUsers () {
  const { data, error, isLoading } = useSWR<Array<User>>('/api/users')

  return {
    users: data,
    isLoading,
    error
  }
}
