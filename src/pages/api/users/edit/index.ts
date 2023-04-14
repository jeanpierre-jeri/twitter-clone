import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@/lib/serverAuth'
import { updateUser } from '@/lib/prisma/users'
import { type EditFormData } from '@/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') return res.status(405).end()

  try {
    const session = await getSession(req, res)
    const { name, bio, coverImage, profileImage } = req.body as EditFormData

    const updatedUser = await updateUser({
      id: session.user.id,
      name,
      bio,
      coverImage,
      profileImage
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
