import type { prisma } from './server/prisma'

declare module 'h3' {
  interface H3EventContext {
    auth?: IAuthJwt | null
    prisma: typeof prisma
  }
}