import useSWR from 'swr'

import type { PostType } from '@/types'



export function usePosts (userId?: string) {
  const url = userId ? `/api/users/${userId}/posts` : '/api/posts'

  const { data, isLoading, mutate } = useSWR <Array<PostType>>(url)

  return {
    posts: data,
    isLoading,
    mutate
  }
}
