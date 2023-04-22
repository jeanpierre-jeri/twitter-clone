import Head from 'next/head'
import { useRouter } from 'next/router'

import type { PostType } from '@/types'

import { Form, Header } from '@/components'
import { CommentFeed, PostItem } from '@/components/posts'
import { ClipLoader } from '@/components/spinners'
import { usePost } from '@/hooks'



export default function PostPage () {
  const router = useRouter()
  const { postId } = router.query
  const { post, isLoading, error } = usePost(postId as string)

  if (isLoading && !error) {
    return (
      <div className='flex justify-center items-center h-full w-20 mx-auto border-sky-200'>
        <ClipLoader />
      </div>
    )
  }

  if (!post) {
    return (
      <>
        <Head>
          <title>Not found / Twitter</title>
        </Head>
        <Header label='Go Back' showBackArrow />
        <h1 className='text-2xl text-center p-8'>No post found</h1>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Post / Twitter</title>
      </Head>
      <Header label='Tweet' showBackArrow />
      <PostItem data={post as PostType} />
      <Form postId={post.id} isComment placeholder='Tweet your reply' />
      <CommentFeed comments={post?.comments ?? []} />
    </>
  )
}
