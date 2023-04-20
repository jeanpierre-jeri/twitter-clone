import { prisma } from './db'



export async function createComment (body: string, userId: string, postId: string) {
  const comment = prisma.comment.create({
    data: {
      body,
      userId,
      postId
    }
  })

  return comment
}
