
import { CommentItem } from './CommentItem'

import type { PostComment } from '@/types'



type CommentFeedProps = {
  comments: Array<PostComment>
}

export function CommentFeed ({ comments = [] }: CommentFeedProps) {
  return (
    <>
      {comments?.map(comment => (
        <CommentItem key={comment.id} comment={comment} />

      ))}
    </>
  )
}
