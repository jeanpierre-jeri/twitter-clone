import useSWR from 'swr'



export function usePosts (userId?: string) {
  const url = userId ? `/api/users/${userId}/posts` : '/api/posts'

  const { data, isLoading, mutate } = useSWR(url)

  return {
    posts: data,
    isLoading,
    mutate
  }
}
