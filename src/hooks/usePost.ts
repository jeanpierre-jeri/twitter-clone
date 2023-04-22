import useSWR from 'swr'

import type { getPostByIdWithUserAndComments } from '@/lib/prisma'



export type Post = Awaited<ReturnType<typeof getPostByIdWithUserAndComments>>

export function usePost (postId: string) {
  const url = postId ? `/api/posts/${postId}` : null
  const { data, isLoading, mutate, error } = useSWR<Post>(url)

  return {
    post: data,
    isLoading,
    mutate,
    error
  }
}
