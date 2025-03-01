import { userRouter } from './routers/user.controller'

export const appRouter = router({
  user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
