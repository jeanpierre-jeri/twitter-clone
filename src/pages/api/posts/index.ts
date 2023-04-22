import type { NextApiRequest, NextApiResponse } from 'next'

import { createPost, getPosts } from '@/lib/prisma/posts'
import { getSession } from '@/lib/serverAuth'



export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).end()

  try {
    const session = await getSession(req, res)

    if (req.method === 'POST') {
      const { body = '' } = req.body as { body: string }

      if (body.trim() === '') throw new Error('Body cannot be empty')

      const post = await createPost({ body, userId: session.user.id! })
      return res.status(200).json(post)
    }

    if (req.method === 'GET') {
      const posts = await getPosts()
      return res.status(200).json(posts)
    }
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}
