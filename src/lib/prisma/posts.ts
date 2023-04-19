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

export async function getPostById (postId: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId
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
