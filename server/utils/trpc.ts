/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { Context } from '../trpc/context'

// Middleware
import {
  authMiddleware,
  currentUserMiddleware,
  instanceMiddleware,
  seedGuardMiddleware
} from '../trpc/middleware'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const trpcInstance = t
export const router = t.router
export const middleware = t.middleware

/**
 * Public procedure
 */
export const publicProcedure = t.procedure
  .use(currentUserMiddleware())
  .use(instanceMiddleware())

/**
 * Protected procedure
 */
export const protectedProcedure = t.procedure
  .use(authMiddleware())
  .use(instanceMiddleware())

/**
 * Procedure for seeding the database
 */
export const seedProcedure = t.procedure.use(seedGuardMiddleware())
