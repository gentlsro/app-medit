import { User } from '$pt'

import {
  UserCreateArgsSchema, UserDeleteArgsSchema, UserFindFirstArgsSchema, UserFindManyArgsSchema, UserUpdateArgsSchema, UserDeleteManyArgsSchema } from '$zm'

  // Functions
import { seedUsers } from '../../libs/User/function/seed'





// The fields that should be searchable
const SEARCH_FIELDS: Array<ObjectKey<User>> = ['name']

export const userRouter = router({
  // Find one
  findOne: protectedProcedure
    .input(extendWithSearch(UserFindFirstArgsSchema))
    .query(async ({ input, ctx }) => {
      const { args, search } = input || {}

      return ctx.prisma.user.findFirstWithSearch(
        args,
        getSearch(search, SEARCH_FIELDS)
      )
    }),

  // Find many
  findMany: publicProcedure
    .input(extendWithMeta(extendWithSearch(UserFindManyArgsSchema)))
    .query(async ({ input, ctx }) => {
      const { args, search, includeCount, includeModel } = input || {}

      return {
        data: await ctx.prisma.user.findManyWithSearch(
          args,
          getSearch(search, SEARCH_FIELDS)
        ),

        // Count
        ...(includeCount && {
          count: await ctx.prisma.user.countWithSearch(
            args,
            getSearch(search, SEARCH_FIELDS)
          ),
        }),

        // Model
        ...(includeModel && {
          model: 'User',
        }),
      }
    }),

  // Create one
  createOne: protectedProcedure
    .input(UserCreateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.user.create(input)
    }),

  // Update one
  updateOne: protectedProcedure
    .input(UserUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update(input)
    }),

  // Delete one
  deleteOne: protectedProcedure
    .input(UserDeleteArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.user.delete(input)
    }),

  // Delete many
  deleteMany: protectedProcedure
    .input(UserDeleteManyArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.user.deleteMany(input)
    }),

  // Seed
  seed: seedProcedure
    .mutation(async ({ ctx }) => {
      return seedUsers()
    }),
})
