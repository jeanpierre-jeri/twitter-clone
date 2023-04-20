import type{ NextApiRequest, NextApiResponse } from 'next'

import { createComment } from '@/lib/prisma'
import { getSession } from '@/lib/serverAuth'



export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const session = await getSession(req, res)

    if (!session.user.id) throw new Error('Not authenticated')

    const { postId } = req.query as { postId: string }
    const { body } = req.body as { body: string }

    if (!postId) throw new Error('Invalid ID')
    if (!body) throw new Error('Body is required')

    const comment = await createComment(body, session.user.id, postId)

    return res.status(200).json(comment)
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}
