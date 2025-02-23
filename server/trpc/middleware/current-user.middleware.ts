import jwt from 'jsonwebtoken'
import { enhance } from '@zenstackhq/runtime'

/**
 * This is used only for the public procedure
 */
export function currentUserMiddleware() {
  return middleware(async opts => {
    const { ctx } = opts

    const cookies = parseCookies(ctx.ev)
    const accessToken = cookies._accessToken as string

    const user = jwt.decode(accessToken) as unknown as IAuthJwt | null

    return opts.next({
      ctx: {
        ...ctx,
        user,
        prisma: enhance(ctx.prisma, { user: user ?? undefined }),
      },
    })
  })
}
