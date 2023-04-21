import { prisma } from './db'



export async function getNotificationsByUserId (userId: string) {
  const notifications = await prisma.notification.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return notifications
}

export async function createNotification (userId: string, body: string) {
  const notification = await prisma.notification.create({
    data: {
      body,
      userId
    }
  })

  return notification
}
