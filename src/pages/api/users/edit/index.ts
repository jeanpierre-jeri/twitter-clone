import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@/lib/serverAuth'
import { updateUser } from '@/lib/prisma/users'
import { type EditFormData } from '@/types'
import { saveImageToCloudinary } from '@/services/cloudinary'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') return res.status(405).end()

  try {
    const session = await getSession(req, res)

    const { name, bio, coverImage = '', profileImage = '' } = req.body as EditFormData

    const updatedData = { name, bio, id: session.user.id } as EditFormData & { id: string }

    if (!!coverImage) {
      const { imageUrl } = await saveImageToCloudinary(coverImage)
      updatedData.coverImage = imageUrl
    }

    if (!!profileImage) {
      const { imageUrl } = await saveImageToCloudinary(profileImage)
      console.log('profile image', imageUrl)
      updatedData.profileImage = imageUrl
    }

    const updatedUser = await updateUser(updatedData)

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
