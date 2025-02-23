import { join } from 'node:path'
import { mergeConfigs } from 'unocss'

// The path relative to the current working directory
// as UnoCSS is only saved in the final layer
// eslint-disable-next-line node/prefer-global/process
const unoConfigPath = join(process.cwd(), '.nuxt', 'uno.config.mjs')

// Require the configuration synchronously
// NOTE: This is fucking stupid but we cannot `await import()` here because uno just can't handle that
const config = require(unoConfigPath).default ?? {}

export default mergeConfigs([
  config,
  {},
])
