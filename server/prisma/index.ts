import { PrismaClient } from '@prisma/client'
import { prismaSearchExtension } from './extensions/prisma-search'

export const prisma = new PrismaClient({ transactionOptions: { timeout: 30e3, maxWait: 60e3 } })
  .$extends(prismaSearchExtension)
