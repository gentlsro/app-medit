export const userRouter = router({
  findMany: publicProcedure
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findMany()
    })
})