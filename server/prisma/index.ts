import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({ transactionOptions: { timeout: 30e3, maxWait: 60e3 } })
