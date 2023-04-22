import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { useUser } from '@/hooks'
import { addFollow, removeFollow } from '@/lib/utils'
import { useStore } from '@/store'



export function useFollow (userId: string) {
  const { data: session } = useSession()
  const { user: currentUser, mutate: mutateCurrentUser } = useUser(session?.user.id as string)
  const { mutate: mutateUser, user } = useUser(userId)
  const [isLoading, setIsLoading] = useState(false)

  const openLoginModal = useStore(state => state.openLoginModal)

  const isFollowing = user?.followingIds?.includes(currentUser?.id ?? '')

  const toggleFollow = async () => {
    if (!session) return openLoginModal()

    try {
      setIsLoading(true)
      const action = isFollowing ? removeFollow : addFollow

      await action(userId)

      await Promise.all([
        mutateUser(),
        mutateCurrentUser()
      ])

      toast.success('Sucess')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isFollowing,
    toggleFollow,
    isLoading
  }
}
