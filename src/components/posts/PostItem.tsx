import { formatDistanceToNowStrict } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

import type { PostType } from '@/types'

import { Avatar, FillHeartIcon, OutlineHeartIcon, OutlineMessageIcon } from '@/components'
import { useLike } from '@/hooks'
import { useStore } from '@/store'



type PostItemProps = {
  data: PostType
  userId?: string
}

export function PostItem ({ data, userId }: PostItemProps) {
  const { openLoginModal } = useStore(({ openLoginModal }) => ({ openLoginModal }))
  const router = useRouter()
  const { hasLiked, toggleLike, loading } = useLike(data.id, userId ?? '')
  const { data: session } = useSession()

  const goToPost = async () => {
    await router.push(`/posts/${data.id}`)
  }

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (!session) return openLoginModal()

    await toggleLike()
  }

  const createdAt = useMemo(() => {
    if (!data.createdAt) return ''
    return formatDistanceToNowStrict(new Date(data.createdAt))
  }, [data.createdAt])

  return (
    <article onClick={goToPost} className='border-b border-neutral-800 p-5 hover:bg-neutral-900 transition-colors block w-full cursor-pointer'>
      <div className='flex items-start gap-3'>
        <Avatar userId={data?.user?.id} />
        <div>
          <div className='flex items-center gap-2' onClick={e => e.stopPropagation()}>
            <Link href={`/users/${data?.user?.id}`} className='text-white font-semibold hover:underline'>
              {data?.user?.name}
            </Link>
            <Link href={`/users/${data?.user?.id}`} className='text-neutral-500 hover:underline hidden md:block'>@{data?.user?.username}</Link>
            <time className='text-neutral-500 text-sm'>{createdAt}</time>
          </div>
          <p className='text-white mt-1 cursor-auto w-fit' onClick={e => e.stopPropagation()}>{data?.body}</p>

          <div className='flex items-center mt-3 gap-10'>
            <button className='flex items-center text-neutral-500 gap-2 transition-colors hover:text-sky-500'>
              <i className='w-5'>
                <OutlineMessageIcon />
              </i>
              {data?.comments?.length || 0}
            </button>

            <button disabled={loading} onClick={handleLike} className='flex items-center text-neutral-500 gap-2 transition-colors hover:text-red-500'>
              <i className='w-5'>
                {hasLiked ? <FillHeartIcon /> : <OutlineHeartIcon />}
              </i>
              {data?.likedIds?.length || 0}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
