import type { NextApiRequest, NextApiResponse } from 'next'
import { getFollowersCountByUserId, getUserById } from '@/lib/prisma/users'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const { userId } = req.query

    if (!userId) throw new Error('Invalid id')

    const [user, followersCount] = await Promise.all([
      getUserById(userId as string),
      getFollowersCountByUserId(userId as string)
    ])

    if (!user) throw new Error('User not found')

    return res.status(200).json({ ...user, followersCount })
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
