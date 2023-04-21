import type{ NextApiRequest, NextApiResponse } from 'next'

import { updateUserHasNotification, getNotificationsByUserId } from '@/lib/prisma'



export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const { userId } = req.query as { userId: string }

    if (!userId) throw new Error('userId required')

    const notifications = await getNotificationsByUserId(userId)

    await updateUserHasNotification(userId)

    return res.status(200).json(notifications)
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}
