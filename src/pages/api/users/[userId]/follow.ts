import type { NextApiRequest, NextApiResponse } from 'next'

import { createNotification } from '@/lib/prisma'
import { getUserById, updateUserFollowingIds, updateUserHasNotification } from '@/lib/prisma/users'
import { getSession } from '@/lib/serverAuth'



export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') return res.status(405).end()

  try {
    const { userId } = req.query as { userId: string }

    const session = await getSession(req, res)
    if (!session.user.id) throw new Error('Not authenticated')

    const user = await getUserById(userId)
    if (!user) throw new Error('Invalid user id')

    let followingIds = [...(user?.followingIds ?? [])]

    if (req.method === 'POST') {
      followingIds.push(session.user.id)

      try {
        await Promise.all([
          createNotification(userId, `${session.user.name ?? 'Someone'} started following you`),
          updateUserHasNotification(userId, true)
        ])
      } catch (error) {
        console.error(error)
      }
    }


    if (req.method === 'DELETE') followingIds = followingIds.filter(id => id !== session.user.id)


    const updatedUser = await updateUserFollowingIds(session.user.id, followingIds)

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}
