import { getServerSession } from 'next-auth/next'

import type { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '@/pages/api/auth/[...nextauth]'



export async function getSession (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email || !session?.user?.id)
    throw new Error('Not authenticated')


  return session
}
