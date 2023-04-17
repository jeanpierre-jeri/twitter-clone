import type { NextApiRequest, NextApiResponse } from 'next'

import { updateUser } from '@/lib/prisma/users'
import { getSession } from '@/lib/serverAuth'
import { saveImageToCloudinary } from '@/services/cloudinary'
import { type EditFormData } from '@/types'



export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') return res.status(405).end()

  try {
    const session = await getSession(req, res)

    const { name = '', bio = '', coverImage = '', profileImage = '' } = req.body as EditFormData

    const updatedData: EditFormData = { name, bio, id: session.user.id! }

    if (coverImage) {
      const { imageUrl } = await saveImageToCloudinary(coverImage)
      updatedData.coverImage = imageUrl
    }

    if (profileImage) {
      const { imageUrl } = await saveImageToCloudinary(profileImage)
      updatedData.profileImage = imageUrl
    }

    const updatedUser = await updateUser(updatedData)

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}
