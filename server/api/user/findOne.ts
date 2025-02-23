import { UserFindFirstArgsSchema } from '$zm'

export default defineEventHandler(async (event) => {
  const { prisma } = event.context
  const input = await getValidatedQuery(event, UserFindFirstArgsSchema.parse)

  return prisma.user.findFirst(input)
})