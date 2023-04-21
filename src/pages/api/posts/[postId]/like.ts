import type { NextApiRequest, NextApiResponse } from 'next'

import { createNotification, getPostById, updatePostLikedIds, updateUserHasNotification } from '@/lib/prisma'
import { getSession } from '@/lib/serverAuth'



export default async function hanlder (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') return res.status(405).end()

  try {
    const session = await getSession(req, res)
    if (!session.user.id) throw new Error('Not authenticated')
    const { postId } = req.query as { postId: string }

    if (!postId) throw new Error('No post id provided')

    const post = await getPostById(postId)

    if (!post) throw new Error('No post found')

    let likedIds = post?.likedIds ?? []

    if (req.method === 'POST') {
      likedIds.push(session.user.id)

      try {
        const name = post.userId === session.user.id ? 'You' : session.user.name ?? 'Someone'

        await Promise.all([
          createNotification(post.userId, `${name} liked your tweet`),
          updateUserHasNotification(post.userId, true)
        ])
      } catch (error) {
        console.error(error)
      }
    }
    if (req.method === 'DELETE') {
      const updatedLikedIds = likedIds.filter(id => id !== session.user.id)
      likedIds = updatedLikedIds
    }

    const updatedPost = await updatePostLikedIds(postId, likedIds)

    return res.status(200).json(updatedPost)
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}
