import { prisma } from './db'



export async function createPost ({ body, userId }: { body: string, userId: string }) {
  const post = await prisma.post.create({
    data: {
      body,
      userId
    }
  })

  return post
}

export async function getPostsByUserId (userId: string) {
  const posts = await prisma.post.findMany({
    where: {
      userId
    },
    include: {
      user: true,
      comments: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return posts
}

export async function getPosts () {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      comments: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return posts
}

export async function getPostByIdWithUserAndComments (id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id
    },
    include: {
      user: true,
      comments: {
        include: {
          user: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  return post
}

export async function getPostById (id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id
    }
  })

  return post
}

export async function updatePostLikedIds (id: string, likedIds: Array<string>) {
  const post = await prisma.post.update({
    where: {
      id
    },
    data: {
      likedIds
    }
  })

  return post
}
