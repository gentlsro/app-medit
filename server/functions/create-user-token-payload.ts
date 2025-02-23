import utilsConfig from '$utilsConfig'
import type { Prisma } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma'

// Constnats
const JWT_SECRET = import.meta.env.JWT_SECRET ?? 'secret'
const domain = utilsConfig.general.domain

export function createUserTokenPayload(
  user: Prisma.UserGetPayload<{
    select: {
      id: true
      firstName: true
      lastName: true
      email: true

      files: {
        where: { type: 'VERIFICATION' },
        select: { id: true, approved: true, }
      }
    }
  }>,
): IAuthJwt {
  const isVerified = user.files.every(file => file.approved)

  return {
    ...omit(user, ['files']),
    isVerified,
  }
}

export async function setAuthCookies(
  accountIdOrEmail: number | string,
  opts: {
    ctx: any
    omitRefreshToken?: boolean
  },
) {
  const { ctx, omitRefreshToken } = opts

  const account = await prisma.user.findFirst({
    where: {
      ...(typeof accountIdOrEmail === 'string' ? { email: accountIdOrEmail } : { id: accountIdOrEmail }),
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,

      files: {
        where: { type: 'VERIFICATION' },
        select: { id: true, approved: true, }
      }
    },
  })

  if (!account) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: $t('auth.error.invalidCredentials'),
    })
  }

  const transformedUser = createUserTokenPayload(account)

  // Access token
  const accessToken = jwt.sign(transformedUser, JWT_SECRET, {
    expiresIn: '15m',
  })

  setCookie(ctx.ev, '_accessToken', accessToken, { httpOnly: true, domain })

  // Refresh token
  let refreshToken: string | undefined

  if (!omitRefreshToken) {
    refreshToken = jwt.sign({ id: account.id }, JWT_SECRET, {
      expiresIn: '1000y',
    })

    setCookie(ctx.ev, '_refreshToken', refreshToken, { httpOnly: true, domain })
  }

  return {
    accessToken,
    refreshToken,
    user: transformedUser,
  }
}
