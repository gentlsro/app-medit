import { enhance } from '@zenstackhq/runtime'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma'

// Constants
const JWT_SECRET = import.meta.env.JWT_SECRET ?? 'secret'

export default defineEventHandler(ev => {
  const path = ev.path

  const cookies = parseCookies(ev)
  const accessToken = cookies._accessToken as string

  // When calling the API, provide the Prisma client with the user context
  if (path.startsWith('/api')) {
    try {
      jwt.verify(accessToken, JWT_SECRET)

      const user = jwt.decode(accessToken) as unknown as IAuthJwt

      ev.context = {
        ...ev.context,
        auth: user,
        prisma: enhance(prisma, { user: user ?? undefined }),
      }
    } catch {
      ev.context = { ...ev.context, prisma: enhance(prisma) }
    }
  }
})
