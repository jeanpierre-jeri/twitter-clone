import type{ NextApiRequest, NextApiResponse } from 'next'

import { createComment, createNotification, getPostById, updateUserHasNotification } from '@/lib/prisma'
import { getSession } from '@/lib/serverAuth'



export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const session = await getSession(req, res)

    if (!session.user.id) throw new Error('Not authenticated')

    const { postId } = req.query as { postId: string }
    const { body = '' } = req.body as { body: string }

    if (!postId) throw new Error('Invalid ID')
    if (body.trim() === '') throw new Error('Body is required')

    const [comment, post] = await Promise.all([
      createComment(body, session.user.id, postId),
      getPostById(postId)
    ])

    try {
      if (post) {
        const name = post.userId === session.user.id ? 'You' : session.user.name ?? 'Someone'
        await Promise.all([
          createNotification(post.userId, `${name} replied to your tweet`),
          updateUserHasNotification(post.userId, true)
        ])
      }
    } catch (error) {
      console.error(error)
    }

    return res.status(200).json(comment)
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}
