import { CommentItem } from './CommentItem'

import type { Comment, User } from '@prisma/client'



type CommentFeedProps = {
  comments: Array<Comment & { user: User }>
}

export function CommentFeed ({ comments = [] }: CommentFeedProps) {
  return (
    <>
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />

      ))}
    </>
  )
}
