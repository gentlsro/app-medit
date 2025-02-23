import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import superjson from 'superjson'
import type { AppRouter } from '../../server/trpc'

// Types

export default defineNuxtPlugin(() => {
  const headers = useRequestHeaders()

  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const client = createTRPCNuxtClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: '/api/trpc',
        headers(opts) {
          // Add headers from operations
          opts.opList.forEach(op => {
            Object.assign(headers, op.context.headers ?? {})
          })

          return headers
        },
      }),
    ],
  })

  return {
    provide: { client },
  }
})
