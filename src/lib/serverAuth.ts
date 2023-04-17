import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

export async function getSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) {
    throw new Error('Not authenticated')
  }

  return session
}
