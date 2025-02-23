import jwt from 'jsonwebtoken'
import { enhance } from '@zenstackhq/runtime'

// Functions
import { setAuthCookies } from '../../functions/create-user-token-payload'

// Constants
const JWT_SECRET = import.meta.env.JWT_SECRET ?? 'secret'

export function authMiddleware() {
  return middleware(async opts => {
    const { ctx } = opts

    const cookies = parseCookies(ctx.ev)
    const accessToken = cookies._accessToken as string
    const refreshToken = cookies._refreshToken as string

    // When access token is valid, we just let the user call the endpoint
    try {
      jwt.verify(accessToken, JWT_SECRET)
      const user = jwt.decode(accessToken) as unknown as IAuthJwt

      return opts.next({
        ctx: {
          ...ctx,
          user,
          prisma: ctx.ev.context.prisma,
        },
      })
    } catch { }

    // Handle refresh token
    try {
      jwt.verify(refreshToken, JWT_SECRET)

      const { id } = jwt.decode(refreshToken) as jwt.JwtPayload
      const { user } = await setAuthCookies(id, { ctx, omitRefreshToken: true })

      return opts.next({
        ctx: {
          ...ctx,
          user,
          prisma: enhance(ctx.prisma, { user }),
        },
      })
    } catch (error) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: $t('auth.error.unauthorized'),
        cause: error,
      })
    }
  })
}
