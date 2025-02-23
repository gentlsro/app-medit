<script setup lang="ts">
import { Prisma } from '@prisma/client'

// Types
import type { ISelectorProps } from '~/components/Selector/types/selector-props.type'

// Functions
import { useUserApi } from '~/libs/User/client/functions/useUserApi'

// Store
import { useInstanceStore } from '~/libs/Instance/instance.store'

type IProps = {
  modelValue?: any
  selectorProps?: ISelectorProps
  where?: Prisma.UserWhereInput
  select?: Prisma.UserSelect
}

const props = defineProps<IProps>()

// Utils
const { userFindMany } = useUserApi()

// Store
const instanceStore = useInstanceStore()

// Layout
const model = defineModel()

const loadData: ISelectorProps['loadData'] = {
  fnc: opts =>
    userFindMany(
      {
        args: {
          // Fetch more
          ...(opts.options?.fetchMore && {
            skip: opts.options?.currentRowsCount,
          }),

          // Instance ID
          ...(instanceStore.instanceId
            ? {
                where: {
                  instanceId: instanceStore.instanceId,
                  ...props.where,
                },
              }
            : props.where),

          take: 50,
          select: props.select,
        },
        search: opts.search,
        includeCount: !opts.options?.fetchMore,
      },
      { signal: opts.abortController?.signal }
    ),
  onSearch: true,
}
</script>

<template>
  <Selector
    v-bind="selectorProps"
    v-model="model"
    :label="selectorProps?.label ?? $t('user.self', 2)"
    :load-data="loadData"
    no-filter
    option-label="name"
  />
</template>
