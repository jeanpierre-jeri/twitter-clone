import { PostItem } from '@/components/posts'
import { usePosts } from '@/hooks'



type PostFeedProps = {
  userId?: string
}

export function PostFeed ({ userId }: PostFeedProps) {
  const { posts = [] } = usePosts(userId)
  return (
    <>
      {posts.map(post => (
        <PostItem key={post.id} userId={userId} data={post} />
      ))}
    </>
  )
}
