import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import NextAuth, { type AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'


import { prisma } from '@/lib/prisma/db'



export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text'
        },
        password: {
          label: 'password',
          type: 'text'
        }
      },
      async authorize (credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error('Email and password required')


        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.hashedPassword)
          throw new Error('Invalid credentials')


        const isCorrectPassword = await compare(credentials.password, user.hashedPassword)

        if (!isCorrectPassword)
          throw new Error('Incorrect password')


        return user
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async session ({ session, token }) {
      session.user.id = token.sub
      return session
    }
  }
}

export default NextAuth(authOptions)
