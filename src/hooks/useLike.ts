import { useSession } from 'next-auth/react'
import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { usePost } from './usePost'
import { usePosts } from './usePosts'

import { addLike, removeLike } from '@/lib/utils'
import { useStore } from '@/store'




export function useLike (postId: string, userId: string) {
  const { post, mutate: mutatePost } = usePost(postId)
  const { mutate } = usePosts(userId)
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const openLoginModal = useStore(state => state.openLoginModal)

  const hasLiked = useMemo(() => {
    const list = post?.likedIds ?? []

    return list.includes(session?.user.id ?? '')
  }, [post?.likedIds, session?.user.id])

  const toggleLike = async () => {
    if (!session) return openLoginModal()
    setLoading(true)
    try {
      const action = hasLiked ? removeLike : addLike

      await action(postId)
      await Promise.all([
        mutatePost(),
        mutate()
      ])

      toast.success('Success')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return {
    hasLiked,
    toggleLike,
    loading
  }
}
