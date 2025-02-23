export default defineEventHandler(async (event) => {
  const { prisma } = event.context

  return prisma.user.deleteMany()
})