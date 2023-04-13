import { User } from '@/types'
import { prisma } from './db'

export const userInfo: Record<keyof User, true> = {
  id: true,
  name: true,
  username: true,
  bio: true,
  email: true,
  image: true,
  coverImage: true,
  profileImage: true
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    select: userInfo
  })

  return users
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
    select: userInfo
  })

  return user
}

export async function getFollowersCountByUserId(id: string) {
  const followersCount = await prisma.user.count({
    where: {
      followingIds: {
        has: id
      }
    }
  })

  return followersCount
}
