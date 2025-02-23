import type { Prisma, User } from '@prisma/client'
import type { ProcedureOptions } from '@trpc/server'

import type {
  UserCreateArgsSchema,
  UserDeleteArgsSchema,
  UserFindFirstArgsSchema,
  UserFindManyArgsSchema,
  UserUpdateArgsSchema,
} from '~z'
// Types
import type {
  IPrismaResult,
  IPrismaResultArray,
} from '~/libs/App/types/prisma/prisma-result.type'

export function useUserApi() {
  const { $client } = useNuxtApp()

  // Find one
  async function userFindOne<T extends $infer<typeof UserFindFirstArgsSchema>>(
    payload?: {
      args?: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>
      search?: string,
    },
    options?: ProcedureOptions
  ) {
    type IResponse = IPrismaResult<
      Prisma.UserGetPayload<T>,
      typeof $client.user.findOne.query,
      User
    >

    return $client.user.findOne.query(payload, options) as Promise<IResponse>
  }

  // Find all
  async function userFindMany<T extends $infer<typeof UserFindManyArgsSchema>>(
    payload?: {
      args?: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>
      search?: string
      includeCount?: boolean
    },
    options?: ProcedureOptions
  ) {
    type IResponse = IPrismaResultArray<
      Prisma.UserGetPayload<T>,
      typeof $client.user.findMany.query,
      User
    >

    return $client.user.findMany.query(payload, options) as Promise<IResponse>
  }

  // Create one
  async function userCreateOne<T extends $infer<typeof UserCreateArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
    options?: ProcedureOptions
  ) {
    type IResponse = IPrismaResult<
      Prisma.UserGetPayload<T>,
      typeof $client.user.createOne.mutate,
      User
    >

    return $client.user.createOne.mutate(args, options) as Promise<IResponse>
  }

  // Update one
  async function userUpdateOne<T extends $infer<typeof UserUpdateArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
    options?: ProcedureOptions
  ) {
    type IResponse = IPrismaResult<
      Prisma.UserGetPayload<T>,
      typeof $client.user.updateOne.mutate,
      User
    >

    return $client.user.updateOne.mutate(args, options) as Promise<IResponse>
  }

  // Delete one
  async function userDeleteOne<T extends $infer<typeof UserDeleteArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>,
    options?: ProcedureOptions
  ) {
    type IResponse = IPrismaResult<
      Prisma.UserGetPayload<T>,
      typeof $client.user.deleteOne.mutate,
      User
    >

    return $client.user.deleteOne.mutate(args, options) as Promise<IResponse>
  }

  return {
    userFindOne,
    userFindMany,
    userCreateOne,
    userDeleteOne,
    userUpdateOne,
  }
}
