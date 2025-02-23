import { $ } from 'bun'
import * as p from '@clack/prompts'
import { generate } from './generate-prisma-types'

async function generateDbSchema() {
  await $`sh -c 'pnpm zenstack:generate'`
}

async function pushDbSchema() {
  await $`sh -c 'pnpm prisma:push'`
}

async function main() {
  try {
    const res = await p.select({
      message: 'Select command',
      options: [
        { label: 'Generate prisma types', value: generate },
        { label: 'Generate db schema', value: generateDbSchema },
        { label: 'Push db schema', value: pushDbSchema },
      ],
    })

    if (typeof res === 'function') {
      await res()
    }
  } catch {
    process.exit(0)
  }
}

await main()
