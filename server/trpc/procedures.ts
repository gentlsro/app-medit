import {
  authMiddleware,
  currentUserMiddleware,
  instanceMiddleware,
  seedGuardMiddleware,
} from './middleware'

/**
 * Public procedure
 */
export const publicProcedure = trpcInstance.procedure
  .use(currentUserMiddleware())
  .use(instanceMiddleware())

/**
 * Protected procedure
 */
export const protectedProcedure = trpcInstance.procedure
  .use(authMiddleware())
  .use(instanceMiddleware())

/**
 * Procedure for seeding the database
 */
export const seedProcedure = trpcInstance.procedure.use(seedGuardMiddleware())
