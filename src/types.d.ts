import { type userInfo } from './lib/prisma/users'
import { type User as PrismaUser } from '@prisma/client'

export interface RegisterFormData {
  email: string
  name: string
  username: string
  password: string
}

export type EditFormData = Pick<User, 'name' | 'bio' | 'coverImage' | 'profileImage'>

export type User = Omit<PrismaUser, 'emailVerified' | 'hashedPassword'>

export type UserWithFollowersCount = User & { followersCount: number }
