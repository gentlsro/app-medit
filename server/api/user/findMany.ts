import { UserFindManyArgsSchema } from '$zm'

export default defineEventHandler(async (event) => {
  const { prisma } = event.context

  const input = await getValidatedQuery(event, UserFindManyArgsSchema.parse)

  return prisma.user.findMany(input)
})