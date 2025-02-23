// Constants
const SEED_HASH = import.meta.env.SEED_HASH ?? 'seed'

export function seedGuardMiddleware() {
  return middleware(async ev => {
    const { next } = ev
    const seedHash = getCookie(ev.ctx.ev, 'SEED_HASH')

    if (isDev()) {
      return next()
    }

    if (!seedHash || seedHash !== SEED_HASH) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
      })
    }

    return next()
  })
}
