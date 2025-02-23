import { createRequire } from 'node:module'
import { createResolver } from 'nuxt/kit'
import { config } from './config'

const { resolve } = createResolver(import.meta.url)

// https://github.com/prisma/prisma/issues/12504
const prismaClientPath = createRequire(import.meta.url).resolve('@prisma/client')

// Constants
const domain = 'domain' in config ? config.domain : undefined

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [['github:gentlsro/UI#master']],

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    'nuxt-lodash',
    'dayjs-nuxt',
  ],

  imports: {
    dirs: [resolve('./client/state')],
  },

  // Runtime config https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig
  runtimeConfig: {
    public: {
      COOKIE_DOMAIN: domain,
    },
  },

  srcDir: './client',

  alias: {
    $zi: resolve('./prisma/generated/zod/inputTypeSchemas/index.ts'), // Abbreviation for "zod input"
    $zm: resolve('./prisma/generated/zod/outputTypeSchemas/index.ts'), // Abbreviation for "zod models"
    $pt: resolve('./prisma/prisma-types.ts'), // Abbreviation for "prisma types"
  },

  // Build
  build: {
    transpile: ['trpc-nuxt'],
  },

  // Future
  future: {
    compatibilityVersion: 4,
  },

  // Nitro
  nitro: {
    imports: {
      imports: [
        { from: '@trpc/server', name: 'TRPCError' },
      ],
    },

    experimental: {
      asyncContext: true,
      websocket: true,
      tasks: true,
    },
  },

  // Vite https://nuxt.com/docs/api/nuxt-config#vite
  vite: {
    resolve: {
      alias: {
        // https://github.com/prisma/prisma/issues/12504
        '.prisma/client/index-browser': prismaClientPath.replace(
          '@prisma/client/default.js',
          '.prisma/client/index-browser.js',
        ),
      },
    },
  },

  // ESLint
  eslint: {
    config: { standalone: false, stylistic: true },
  },

  // I18n
  i18n: {
    strategy: 'prefix_and_default',
    skipSettingLocaleOnNavigate: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      cookieDomain: domain,
    },
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
    defaultLocale: 'en-US',
    langDir: '../i18n',
    locales: [
      {
        code: 'en-US',
        file: 'en-US.json',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
        icon: 'i-emojione:flag-for-united-kingdom',
      },
      {
        code: 'cs-CZ',
        file: 'cs-CZ.json',
        dateFormat: 'DD.MM.YYYY',
        currency: 'CZK',
        icon: 'i-emojione:flag-for-czechia',
      },
    ],
  },

  // UnoCSS
  unocss: { nuxtLayers: true },
})
