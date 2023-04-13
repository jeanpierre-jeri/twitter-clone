import type { NextApiRequest, NextApiResponse } from 'next'
import { getUsers } from '@/lib/prisma/users'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const users = await getUsers()

    return res.status(200).json(users)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
