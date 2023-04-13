import { type userInfo } from './lib/prisma/users'
import { type User } from '@prisma/client'

export interface RegisterFormData {
  email: string
  name: string
  username: string
  password: string
}

export type User = Pick<User, 'id' | 'name' | 'username' | 'bio' | 'email' | 'image' | 'coverImage' | 'profileImage'>
export type UserWithFollowersCount = User & { followersCount: number }
