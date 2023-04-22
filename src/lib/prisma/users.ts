import { prisma } from './db'

import type { EditFormData, User } from '@/types'



export const userInfo: Record<keyof User, true> = {
  id: true,
  name: true,
  username: true,
  bio: true,
  email: true,
  image: true,
  coverImage: true,
  profileImage: true,
  createdAt: true,
  followingIds: true,
  hasNotification: true,
  updatedAt: true,
}

export async function getUsers () {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: userInfo,
    take: 8
  })

  return users
}

export async function getUserById (id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  return user
}

export async function getUserByIdWithSelectInfo (id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: userInfo,
  })

  return user
}

export async function getFollowersCountByUserId (id: string) {
  const followersCount = await prisma.user.count({
    where: {
      followingIds: {
        has: id,
      },
    },
  })

  return followersCount
}

export async function updateUser ({ bio, coverImage, id, name, profileImage }: EditFormData) {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      bio,
      coverImage,
      name,
      profileImage,
    },
  })

  return updatedUser
}

export async function updateUserFollowingIds (id: string, followingIds: Array<string>) {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      followingIds,
    },
  })

  return updatedUser
}

export async function updateUserHasNotification (id: string, hasNotification = false) {
  const updatedUser = await prisma.user.update({
    where: {
      id
    },
    data: {
      hasNotification
    }
  })

  return updatedUser
}
