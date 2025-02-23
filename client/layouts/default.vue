<script setup lang="ts">
import { utilsConfig } from '$utilsConfig'
import type { LocaleObject } from '@nuxtjs/i18n'

// Utils
// const { logout } = useAuthApi()
const { handleRequest } = useRequest()
const { locale, locales } = useI18n()
const { localesByCode, handleSetLocale } = useLocale()
const { color: themeColor } = useTheme()

const _locales = computed(() => locales.value as LocaleObject[])

// Layout
const userState = useCurrentUser()

async function handleLogout() {
  // await handleRequest(logout)
  userState.value = null

  nextTick(() => {
    $nav(utilsConfig.app.signInUrl)
  })
}
</script>

<template>
  <div class="layout">
    <Navigation>
      <Breadcrumbs grow />

      <Btn size="sm" label="Seed" :to="$p('/seed')" />

      <!-- Account btn -->
      <Btn
        size="sm"
        icon="i-iconamoon:profile !h-5.5 !w-5.5"
      >
        <Menu
          :no-arrow="false"
          placement="bottom-end"
          w="60"
          no-uplift
        >
          <!-- Name & email -->
          <div
            flex="~ col items-center"
            p="x-2 y-1"
          >
            <span font="semibold rem-18">
              {{ getFullName(userState) }}
            </span>

            <span text="caption">
              {{ userState?.email }}
            </span>
          </div>

          <Btn
            size="sm"
            bg="!primary"
            color="white"
            border="!black !dark:white"
            outlined
            no-uppercase
            :label="$t('auth.account')"
          />

          <Separator />

          <!-- Locale -->
          <Item
            h="34px"
            p="x-3"
          >
            <div class="i-clarity:language-line" />

            <span
              text="sm"
              p="l-16px"
            >
              {{ localesByCode[locale]?.language }}
            </span>

            <Menu
              :no-arrow="false"
              no-uplift
              :fit="false"
              placement="left"
            >
              <template #default="{ hide }">
                <Btn
                  v-for="(_locale, idx) in _locales"
                  :key="idx"
                  :icon="`${_locale.icon} w-8 h-8`"
                  :label="_locale.language"
                  size="sm"
                  no-uppercase
                  @click="[handleSetLocale(_locale), hide()]"
                />
              </template>
            </Menu>
          </Item>

          <!-- Theme toggle -->
          <ThemeToggle
            :label="$t(`app.theme.${themeColor}`)"
            :no-hover-effect="false"
            p="y-1"
          />

          <Separator
            m="t-3"
          />

          <!-- Logout -->
          <Btn
            :label="$t('auth.logout')"
            color="negative"
            size="sm"
            @click="handleLogout"
          />
        </Menu>
      </Btn>
    </Navigation>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  @apply flex flex-col fit min-h-full;
}
</style>
