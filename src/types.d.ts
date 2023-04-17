import { type User as PrismaUser } from '@prisma/client'



export type RegisterFormData = {
  email: string
  name: string
  username: string
  password: string
}

export type EditFormData = Pick<User, 'name' | 'bio'> & {
  id?: string
  coverImage?: string | undefined
  profileImage?: string | undefined
}

export type User = Omit<PrismaUser, 'emailVerified' | 'hashedPassword'>

export type UserWithFollowersCount = User & { followersCount: number }
