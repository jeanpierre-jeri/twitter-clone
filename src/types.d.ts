import type { User as PrismaUser, Comment, Post } from '@prisma/client'



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

export type PostType = Post & {
  user: User
  comments: Array<Comment>
}

export type PublicUser = Pick<User, 'id' | 'name' | 'username' | 'bio' | 'email' | 'image' | 'coverImage' | 'followingIds' | 'hasNotification' | 'updatedAt' | 'profileImage' | 'createdAt'>

export type PostComment = Comment & { user: PublicUser }
