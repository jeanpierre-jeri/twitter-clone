import type { NextApiRequest, NextApiResponse } from 'next'

import { getPostByIdWithUserAndComments } from '@/lib/prisma'



export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const { postId } = req.query as { postId: string }

    if (!postId) throw new Error('No post id provided')

    const post = await getPostByIdWithUserAndComments(postId)

    return res.status(200).json(post)
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}
