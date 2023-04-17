import type { NextApiRequest, NextApiResponse } from 'next'

import { getPostsByUserId } from '@/lib/prisma/posts'



export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const { userId } = req.query as { userId: string }

    const posts = await getPostsByUserId(userId)

    return res.status(200).json(posts)
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}
