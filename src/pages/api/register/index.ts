import { hash } from 'bcrypt'

import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma/db'
import { type RegisterFormData } from '@/types'



export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { email, username, name, password } = req.body as RegisterFormData

    if (!email || !username || !name || !password) return res.status(400).json({ error: 'Missing fields' })

    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword
      },
      select: {
        email: true,
        username: true,
        name: true,
        id: true
      }
    })

    return res.status(200).json(user)
  } catch (error) {
    console.error('Register error', error)
    return res.status(400).end()
  }
}
