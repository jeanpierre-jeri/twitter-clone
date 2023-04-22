import { formatDistanceToNowStrict } from 'date-fns'
import Link from 'next/link'
import { useMemo } from 'react'

import { Avatar } from '../Avatar'

import type { PostComment } from '@/types'



type CommentProps = {
  comment: PostComment
}

export function CommentItem ({ comment }: CommentProps) {
  const createdAt = useMemo(() => {
    if (comment.createdAt == null) return null

    return formatDistanceToNowStrict(new Date(comment.createdAt))
  }, [comment.createdAt])
  return (
    <article className='border-b border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition-colors'>
      <div className='flex items-start gap-3'>
        <Avatar userId={comment.userId} />
        <div>

          <div className='flex items-baseline gap-2'>
            <Link href={`/users/${comment.userId}`} className='flex items-center gap-2'>
              <h3 className='text-white font-semibold hover:underline'>{comment.user.name}</h3>
              <p className='text-neutral-500 hover:underline hidden md:block'>@{comment.user.username}</p>
            </Link>
            <time className='text-neutral-500 text-sm'>{createdAt}</time>
          </div>
          <p className='text-white mt-1'>
            {comment.body}
          </p>
        </div>
      </div>
    </article>
  )
}
